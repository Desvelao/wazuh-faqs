---
slug: "wazuh-plugin-alerts-not-showing2"
date: "2025-02-19"
title: "Alerts are not showing in the Wazuh plugin"
author: ""
description: ""
tags: [ "alerts", "elasticsearch", "filebeat", "wazuh-app", "wazuh-indexer" ]
version: "4.x"
---

### Issue

A expected alert is not visible in Wazuh dashboard or Kibana.

### Remediation

This could be caused for any problem in the steps of the log-alert/archive flow:
1. Log collection: Wazuh agent or Wazuh server
2. Log analysis: Wazuh server
3. Indexation: Filebeat and Wazuh indexer/Elasticsearch
4. Visualization: Wazuh dashboard/Kibana

1. Log collection
1.1. Ensure the log is collected by the Wazuh agent (or Wazuh server if the log is collected by this).
1.1.1 Configuration

Ensure the Wazuh agent has the configuration to collect the log (reading from file, executing command, etc...)
1.1.1.1 If you changed the configuration recently, you should ensure the agent was restarted to take effect the new configuration
1.1.1.2 Review the agent logs and ensuring the agent is monitoring without errors the file/executing the command, you could need to enable the verbosity of agent logs. See https://documentation.wazuh.com/current/user-manual/reference/.internal-options.html#internal-configuration (change to the version of the Wazuh agent you are using). You could use some tool such as `grep` to filter the logs.

1.1.2 Connection with Wazuh server
1.1.2.1 Wazuh agent can communicate with the Wazuh server. Problems with IPs, firewall, ports.
1.1.2.2 Wazuh agent is active

2. Log analysis
2.1. Wazuh server is running
```
systemctl status wazuh-manager
```
2.2. Ensure the log is received by the Wazuh server. Enable `archives` to write the received logs to a file (`.log` or `.json`) See https://documentation.wazuh.com/current/user-manual/manager/event-logging.html#archiving-event-logs (change to the version of the Wazuh agent you are using)
2.3. The log should generate an alert
  2.3.1. Use the `ossec-logtest`, `wazuh-logtest` tool (in the Wazuh server) or Ruleset test to test if the log matches with a rule and its rule level is equal or higher to the configured level threshold ( by default it is 3 )
  2.3.2. If the log should generate an alert, check if this is present in the `alerts.json` file. Attention when the alert was generated regarding the `timestamp` field.
  ```console
  grep <keyword> /var/ossec/logs/alerts/alerts.json
  ```

3. Indexation
  3.1. Filebeat
    3.1.1. Runining
    ```console
    systemctl status filebeat
    ```
    3.1.2. `wazuh` module is installed
    3.1.3. Configuration: ensure the `alerts` or `archives` (depending if the event is an alert or archive) is enabled
    3.1.4. Connection with Wazuh indexer/Elasticsearch
    ```
    filebeat test output
    ```
    3.1.5. Review the logs:
    ```console
    cat /var/log/filebeat/filebeat
    ```

    - Filter by errors/warnings
    ```console
    grep -iE "err|warn" /var/log/filebeat/filebeat
    ```
  3.2. Wazuh indexer/Elasticsearch
    3.2.1 Review the logs:
    - Wazuh indexer
    ```
    grep -iE "err|warn" /var/log/wazuh-indexer/<CLUSTER_NAME>.log
    ```

    - Elasticsearch
    ```
    grep -iE "err|warn" /var/log/elasticsearch/<CLUSTER_NAME>.log
    ```
    
    where:
        - `<CLUSTER_NAME>` is the name of your Wazuh indexer/Elasticsearch cluster.

4. Visualization
  4.1 Connection with Wazuh indexer/Elasticsearch: ensure Wazuh dashboard/Kibana is connected to the Wazuh indexer/Elasticsearch where the data is available.
  4.2 Review the user and managed filters are correct to display the expected document (alert/archive)
    4.2.1 Use the Discover app to filter the data that does not have managed filters
    4.2.2 The Wazuh plugins could add some managed filters that could cause the alert is not displayed:
        - alerts: by `cluster.name` or `manager.name`

        Did you changed the name of your cluster recently? This change could causes that you don't see previous alerts.
