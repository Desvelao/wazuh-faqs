---
slug: "conflicts-fields-index-pattern"
date: "2025-05-22"
title: "Conflicts in index pattern fiels."
author: ""
description: "Backup the data of Alerting applicaiton of Wazuh dashboard."
tags: [ "alerting", "backup"]
version: ""
---

### Issue

Conflicts in index pattern fields

### Remediation

This is caused because the same field has different mapping for different indices due to changes in the mappings of the index templates or a new index was generated with different mappings to the previous ones that match the same index pattern.

The remediation is fixing the mappings ensuring each field has the same mapping in each index.

If the indices has a template that was updated with the new mappings, you could use reindex API to copy the data of the indices with wrong or outdated mappings to new ones that will be created with the new mappings taking into account the new index name matches with the index pattern of the template. For this case, follow the steps:

1. Reindex the index with worng mappings to a new one whose name matches with the index patterns that apply the index template

```
POST _reindex
{
  "source": {
    "index": "<source>"
  },
  "dest": {
    "index": "<destination>"
  }
}
```

where:
- `<source>` index with wrong mapping
- `<destination>` new index tghat matches with the index pattern to apply the template that has defined the new mappings

2. Check the new index has been created with the expected mapping:
```
GET wazuh-alerts-4.x-2025.05.16-reindexed/_mapping
GET wazuh-alerts-4.x-2025.05.16-reindexed/_mapping/fields/<fields>
```

where:
- `<fields>`: fields that changed the mapping

3. Check the data has been copied correctly to the new index. Check the documents, or documents count using some query could be considered as a "validation"

4. Delete the index with wrong mappings:
> Alternativally, you could consider to reindex the data to another index to keep a backup but the index name can not match with the index pattern with the conflict.
```
DELETE <index_name>
```
