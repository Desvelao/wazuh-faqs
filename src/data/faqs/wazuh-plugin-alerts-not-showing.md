---
slug: "wazuh-plugin-alerts-not-showing"
date: "2022-06-20"
title: "Alerts are not showing in the Wazuh plugin"
description: ""
tags: "alerts,elasticsearch,filebeat,wazuh-app,wazuh-indexer"
version: ""
---

### Issue

Give to an user permissions for specific Elasticsearch documents.

### Remediation

- Check the Wazuh manager is generating alerts in the alerts.json file (by default: `/var/ossec/logs/alerts/alerts.json`). See the `timestamp` field of the alert.
```
tail -n1 /var/ossec/logs/alerts/alerts.json
```

- `wazuh` module for Filebeat is installed
```
ls /usr/share/filebeat/module/wazuh
```

- Review Filebeat configuration. See the Filebat configuration file (`/var/filebeat/filebeat.yml`). Obfuscate the sensitive data.
  - `wazuh` module is enabled fo the `alerts`/`archives`.
```
cat /etc/filebeat/filebeat.yml
```

- Filebeat-Wazuh indexer/Elasticsearch connection
```
filebeat test output
```

- Filebeat logs filtering by errors or warnings
```
grep -iE "err|warn" /var/log/filebeat/filebeat
```

- Wazuh indexer logs filtering by errors or warnings
```
grep -iE "err|warn" /var/log/wazuh-indexer/<CLUSTER_NAME>.log
```

- Elasticsearch logs filtering by errors or warnings
```
grep -iE "err|warn" /var/log/elasticsearch/<CLUSTER_NAME>.log
```

- Wazuh dashboard/Kibana is connected to the Wazuh inxder/Elasticsearch that have the alerts indexed

- Wazuh plugin filters by `cluster.name` or `manager.name`. Did you change this name recently? This change could causes that you don't see previous alerts.