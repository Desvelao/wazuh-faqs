---
slug: "redefine-timestamp-field"
date: "2025-06-11"
title: "Redefine the timestamp field using another field at ingestion time"
author: ""
description: ""
tags: [ "elasticsearch", "timestamp", "wazuh-indexer"]
version: ""
---

### Issue

Set the `timestamp` field using another extracted field.

### Remediation


## Alerts: Future events

If the event is related to `alerts` or `archives` datasets, modify the ingest pipeline processors. See <a href='/faqs/filebeat-modify-ingest-pipeline'>modify ingest pipeline</a>.

For example, for setting the `timestamp` field using the `data.aws.eventTime` field, add the following ingest pipeline proccessor to the pipeline:

```json
{
  "date": {
    "if": "ctx.data != null && ctx.data.aws != null && ctx.data.aws.eventTime != null",
    "field": "data.aws.eventTime",
    "target_field": "timestamp",
    "formats": ["ISO8601"],
    "ignore_failure": true
  }
},
```
> Notes:
> Ensure defining this processor before the processor that defines the `@timestamp` field using the `timestamp` field https://github.com/wazuh/wazuh/blob/v4.12.0/extensions/filebeat/7.x/wazuh-module/alerts/ingest/pipeline.json#L103-L111 to the `timestamp` and `@timestamp` fields has the same value.
>
> The `formats` property defines the expected format of the `field` property to convert to date, so ensure the value of the `field` property has a matching format with the `formats` property, else this could give error.
>
> The `ignore_failure` property sets as `true` will ignore any failure that will not cause the document can be dropped and not indexed into Wazuh indexer.

## Existant documents

Use the Wazuh indexer API to update the `timestamp` field to a value from the field reference through the `POST <index_or_index_pattern>/_update_by_query`

Take special attention to the expected format of date stored in the `timestamp` field ensuring the update of the `timestamp` field keeps the similar format.

Assuming this has the following format: `"yyyy-MM-dd'T'HH:mm:ss.SSSZ"`, you could update the `timestamp` fields with:

```
POST <index_or_index_pattern>/_update_by_query
{
  "script": {
    "source": """if (ctx._source.data != null && ctx._source.data.aws != null && ctx._source.data.aws.eventTime != null) {
        // Get the eventTime string from the keyword field.
        String eventTime = ctx._source.data.aws.eventTime;
        // Parse the eventTime string into a ZonedDateTime.
        ZonedDateTime zdt = ZonedDateTime.parse(eventTime);
        // Convert the ZonedDateTime to a java.util.Date.
        Date date = Date.from(zdt.toInstant());
        // Create a formatter with the desired pattern.
        def sdf = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        // Set the formatter timezone to UTC to ensure "+0000" is appended.
        sdf.setTimeZone(java.util.TimeZone.getTimeZone("UTC"));
        // Format the date and update the timestamp field.
        ctx._source.timestamp = sdf.format(date);
      }""",
    "lang": "painless"
  },
  "query": {
    "script": {
      "script": {
        "source": "if (doc['data.aws.eventTime'].size() == 0 || doc['timestamp'].size() == 0) { return false; } return true;",
        "lang": "painless"
      }
    }
  }
}
```

If you want to compare visually the values fo `timestamp` and `data.aws.eventTime` values:

```
GET wazuh-alerts-*/_search
{
  "size": 10000,
  "_source": ["timestamp", "data.aws.eventTime"],
  "query": {
    "exists": {
      "field": "data.aws.eventTime"
    }
  }
}
```

replace the placeholders:
- `<index_or_index_pattern>`: index or index pattern to apply the documents update

> This query returns the first 10000 documents where the `data.aws.eventTime` field exist and returns the `timestamp` and `data.aws.eventTime` fields for the `wazuh-alerts-*` index pattern. If you know some indices where the `timestamp` and `data.aws.eventTime` fields does not match, consider to check these indices using the request commented above.