---
slug: "separate-conditionally-events-to-different-indices"
date: "2023-10-20"
title: "Separate conditionally events to different indices"
author: "Desvelao"
description: "Separate conditionally events to different indices"
tags:  [ "elasticsearch", "events", "index", "wazuh-indexer" ]
version: ""
---

### Issue
Separate conditionally alerts or archives to different indices

### Remediation

The Wazuh alerts or archives are indexed through an ingest pipeline. Theses pipelines have a processor that sets the index name using the `date_index_name` processor with the following schema:
- a prefix: `wazuh-alerts-4.x-` for alerts or `wazuh-archives-4.x-*` for archives
- a suffix: date in the format `YYYY.MM.DD`
generating a index name as `wazuh-alerts-4.x-2023-10-20` or `wazuh-archives-4.x-2023-10-20`.

Note that `alerts` and `archives` dataset have different ingest pipelines

Reference of usage `date_index_name` processor in the alerts ingets pipeline of `wazuh` module for Filebeat: https://github.com/wazuh/wazuh/blob/v4.5.3/extensions/filebeat/7.x/wazuh-module/alerts/ingest/pipeline.json#L83-L91.

To separate some events to another index, adds after the default `date_index_name` processor, another processor that sets conditionally the index name for a subset of events. Add the condition to apply these processor using the `if` property. Documentation: https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html#conditionally-run-processor.

Depending on the format of the index name:
- contains the date: use the `date_index_name` processor https://www.elastic.co/guide/en/elasticsearch/reference/7.10/date-index-name-processor.html
    ```
    {
        "date_index_name" : {
            "field" : "timestamp",
            "date_rounding" : "d"
            "index_name_prefix" : "my-index-name-",
            "index_name_format": "yyyy.MM.dd",
            "ignore_failure": false,
            "if": "CONDITION"
        }
    }
    ```
- fixed: use the `set` processor to set the `_index` name https://www.elastic.co/guide/en/elasticsearch/reference/7.10/set-processor.html
    ```
    {
        "set": {
            "field" : "_index",
            "value" : "my-index-name",
            "ignore_failure" : true
            "if": "CONDITION"
        }
    }
    ```

Replace the `CONDITION` placeholder by the condition to separate the event to another index. See the how to run contionally the processor https://www.elastic.co/guide/en/elasticsearch/reference/current/ingest.html#conditionally-run-processor.


The ingest pipeline can be modified through:
- editing the ingest pipeline file of `wazuh` module used by Filebeat.
  1. Edit the ingest pipeline.json file adding the processor
  2. Update the pipeline
  ```
  filebeat setup --pipelines
  ```
- using the Wazuh indexer/Elasticsearch API
  - udpate pipeline: https://www.elastic.co/guide/en/elasticsearch/reference/7.10/put-pipeline-api.html
  - get pipeline: https://www.elastic.co/guide/en/elasticsearch/reference/7.10/get-pipeline-api.html

Ensure the ingest pipeline was modified correctly. The new events should be separated in different indices according to the ingest pipeline.
