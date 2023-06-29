---
slug: "filebeat-modify-ingest-pipeline"
date: "2020-09-15"
title: "Modify ingest pipeline"
author: ""
description: "modify-ingest-pipeline"
tags: [ "filebeat", "ingest", "pipeline" ]
version: ""
---

### Issue

Modify the ingests pipeline for alerts or archives.

### Remediation

1. Edit the `pipeline.json` file of the module you want to modify.

- `alerts`: `/usr/share/filebeat/module/wazuh/alerts/ingest/pipeline.json`
- `archives`: `/usr/share/filebeat/module/wazuh/archives/ingest/pipeline.json`

2. Update the ingest pipelines:

```
filebeat setup --pipelines
```

3. Check the ingest pipeline was updated. Go to Kibana Dev Tools and do the request:

```
GET _ingest/pipeline
```

Review the change is updated.

> Note: The changes in the pipelines affect to the new documents, not the older ones.
