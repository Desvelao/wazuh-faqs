---
slug: "backup-alerting-data"
date: "2024-06-17"
title: "Backup the data of Alerting applicaiton of Wazuh dashboard."
author: ""
description: "Backup the data of Alerting applicaiton of Wazuh dashboard."
tags: [ "alerting", "backup"]
version: ""
---

### Issue

Backup the data of Alerting applicaiton of Wazuh dashboard.

### Remediation

The monitors and triggers of the Alerting application are stored into the `.opendistro-alerting-config` index according to this topic on the OpenSearch forum: https://forum.opensearch.org/t/back-up-of-alerting-monitors-destinations/959

List and check the existence of this index (`.opendistro-alerting-config`), run this request from the `Dev Tools` application of Wazuh dashboard:
```GET _cat/indices?expand_wildcards=all```
![image](https://github.com/wazuh/community/assets/34042064/19b8eaf7-d57b-4e9f-9650-312bed215fe7)

See the documents stored on the index, if this was configured as a system index, then you could need to run a request to the Wazuh indexer API using the admin certificates. Example:
```wazuh-indexer@wazuh:~/certs$ curl --cert admin.pem --key admin-key.pem --cacert ca.pem -u admin:SecretPassword https://localhost:9200/.opendistro-alerting-config/_search
{"took":2,"timed_out":false,"_shards":{"total":1,"successful":1,"skipped":0,"failed":0},"hits":{"total":{"value":2,"relation":"eq"},"max_score":1.0,"hits":[{"_index":".opendistro-alerting-config","_id":"1vU6JZABro-E19qk3yOH-metadata","_score":1.0,"_routing":"1vU6JZABro-E19qk3yOH","_source":{"metadata":{"monitor_id":"1vU6JZABro-E19qk3yOH","last_action_execution_times":[]}}},{"_index":".opendistro-alerting-config","_id":"1vU6JZABro-E19qk3yOH","_score":1.0,"_source":{"monitor":{"type":"monitor","schema_version":7,"name":"custom_monitor","monitor_type":"query_level_monitor","user":{"name":"admin","backend_roles":["admin"],"roles":["manage_wazuh_index","own_index","all_access"],"custom_attribute_names":[],"user_requested_tenant":null},"enabled":true,"enabled_time":1718611533558,"schedule":{"period":{"interval":1,"unit":"MINUTES"}},"inputs":[{"search":{"indices":["wazuh-alerts-*"],"query":{"size":0,"query":{"bool":{"filter":[{"range":{"@timestamp":{"from":"{{period_end}}||-1h","to":"{{period_end}}","include_lower":true,"include_upper":true,"format":"epoch_millis","boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}},"aggregations":{}}}}],"triggers":[{"query_level_trigger":{"id":"q8tuJZABD9pI-yvSsJEd","name":"custom_trigger","severity":"1","condition":{"script":{"source":"ctx.results[0].hits.total.value > 10000","lang":"painless"}},"actions":[]}}],"last_update_time":1718614929439,"ui_metadata":{"schedule":{"cronExpression":"0 */1 * * *","period":{"unit":"MINUTES","interval":1},"timezone":null,"daily":0,"monthly":{"type":"day","day":1},"weekly":{"tue":false,"wed":false,"thur":false,"sat":false,"fri":false,"mon":false,"sun":false},"frequency":"interval"},"search":{"searchType":"graph","bucketValue":1,"timeField":"@timestamp","bucketUnitOfTime":"h","groupBy":[],"filters":[],"aggregations":[]},"triggers":{"custom_trigger":{"value":10000,"enum":"ABOVE"}},"monitor_type":"query_level_monitor"},"data_sources":{"query_index":".opensearch-alerting-queries","findings_index":".opensearch-alerting-finding-history-write","findings_index_pattern":"<.opensearch-alerting-finding-history-{now/d}-1>","alerts_index":".opendistro-alerting-alerts","alerts_history_index":".opendistro-alerting-alert-history-write","alerts_history_index_pattern":"<.opendistro-alerting-alert-history-{now/d}-1>","query_index_mappings_by_type":{},"findings_enabled":false},"owner":"alerting"}}}]}}wazuh-indexer@wazuh:~/certs$ ```
> The `admin.pem`,  `admin-key.pem` and `ca.pem` can be found on the Wazuh indexer installation if you configured the security (it is enabled by default)

So, to backup the monitors and triggers of Alerting application of Wazuh dashboard, you need to create an snapshot of the `.opendistro-alerting-config`. It seems it could have others indices related to alerting, so you could need to backup these indices too depending on if you need the stored data or not. For example, in the shared screenshot, there is an index called `.opendistro-alerting-alerts`.