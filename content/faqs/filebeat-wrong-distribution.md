---
slug: "filebeat-wrong-distribution"
date: "2020-06-21"
title: "Filebeat requires the default distribution"
author: ""
description: "Give to the Kibana internal user permissions for run Wazuh app backend jobs"
tags: [ "wazuh-app", "wazuh-app-jobs", "permissions" ]
version: ""
---

### Issue

talk to server... ERROR Connection marked as failed because the onConnect callback failed: Filebeat requires the default distribution of Elasticsearch. Please update to the default distribution of Elasticsearch for full access to all free features, or switch to the OSS distribution of Filebeat.

### Remediation

You possibly installed the OSS Elasticsearch distribution and the default Filebeat distribution (non-OSS). Ths distribution of Filebeat and Elasticsearch should match (OSS or non-OSS).

Replace the Filebeat distribution to OSS.
