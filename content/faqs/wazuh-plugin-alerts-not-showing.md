---
slug: "wazuh-plugin-alerts-not-showing"
date: "2022-06-20"
title: "Alerts are not showing in the Wazuh plugin"
author: ""
description: ""
tags: [ "alerts", "elasticsearch", "filebeat", "wazuh-app", "wazuh-indexer" ]
version: ""
---

### Issue

The alerts data is not visible in Kibana or Wazuh dashboards or stopped to be displayed.

### Remediation

This could be caused by the next reasons:
- the data is not indexed due a problem in the workflow of generation and indexation
- the filters used in Kibana/Wazuh dashboards don't match with any documents

How to review the generation and indexation flow of Wazuh alerts

1. Check the Wazuh manager/s service is running
```
systemctl status wazuh-manager
```

or

```
service wazuh-manager status
```

2. Ensure the Wazuh manager/s is generating new alerts. Review the `alerts.json` file where the alerts are stored.
```
tail -n1 /var/ossec/logs/alerts/alerts.json
```

The previous command, should display the last line of the `alerts.json` file. Review if the `timestamp` property displays a recent date.

3. Ensure the `wazuh` module is installed
```
ls /usr/share/filebeat/module/wazuh
```

4. Check the Filebeat service is running
```
systemctl status filebeat
```

or

```
service filebeat status
```

5. Verify the connection Filebeat-Elasticsearch
```
filebeat test output
```

6. Review the Filebeat logs ( you could filter by errors/warnings ):
```
grep -iE "err|warn" /var/log/filebeat/filebeat
```

7. Optionally, you could review the Elasticsearch/Wazuh indexer logs too, but the problem could be identified in the above check.

- Elasticsearch
```
grep -iE "err|warn" /var/log/elasticsearch/<CLUSTER_NAME>.log
```
- Wazuh indexer
```
grep -iE "err|warn" /var/log/wazuh-indexer/<CLUSTER_NAME>.log
```

where:
- `<CLUSTER_NAME>` is the name of your Elasticsearch/Wazuh indexer cluster.

8. Ensure the Kibana/Wazuh dashboard instance is connected to the same Elasticsearch/Wazuh indexer cluster where the data is being indexed.

9. Review if you can see the data in the Discover filters, if so, but you can not see the data in the Wazuh plugins, this could be caused by the filters managed by the appp or the user filters does not match the expected documents:

9.1. Filters added (not managed by user) by the Wazuh plugins for Kibana or Wazuh dashboard: cluster.name, manager.name, rule.groups, etc... Changing the manager name (in manager mode) or cluster name (in cluster mode) will cause the filter value change, and you can not see previous data to the change.
9.2. Hidden filters of the Wazuh plugins:
9.2.1. If the alerts related to Wazuh servers (agent.id=0) then this could be caused by `hideMnaagerAlerts` is enabled. Disable it to see these alerts.
9.2.2. In old versions, when the `run_as` is enabled, there is a hidden filter related to the Wazuh server RBAC permissions related to get information about the agents, this adds a filter using the "allowed" agents
9.3 User filters: filters, query or date range filter

10. Ensure the user has no restricted the permissions using document level security

