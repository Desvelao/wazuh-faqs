---
slug: "wazuh-dashboard-missing-plugins"
date: "2023-04-28"
title: "Wazuh dashboard missing plugins"
author: "Desvelao"
description: ""
tags: [ "anomaly-detection", "wazuh-dashboard", "wazuh-dashboard-plugins" ]
version: ""
---

### Issue

Wazuh dashboard missing plugins.

### Remediation

Depending on the Wazuh dashboard version, some plugins could not be included in the default installation comparing to the OpenSearch Dashboards base version that is based on.

They can be installed again. Follow the next steps:

> For Wazuh dashboard deployed in Docker, remove the `sudo -u wazuh-dashboard` and ensure to execute the command as `wazuh-dashboard` user

1. Install the plugin
```
sudo -u wazuh-dashboard /usr/share/wazuh-dashboardbin/opensearch-dashboards-plugin install <plugin_id>
```
> Replace the `<plugin_id>` with the ID of the plugin to install. For example, you can check the list of removed (for Wazuh dashboard 4.4.1) here: https://github.com/wazuh/wazuh-packages/blob/v4.4.1/stack/dashboard/base/builder.sh#L165-L169

2. Restart the Wazuh dashboard service

- systemd
```
systemctl restart wazuh-dashboard
```

- SysV
```
service wazuh-dashboard restart
```

Now, the plugin should be visible in the Wazuh dashboard menu.

For upgrades, remove the old plugin and install the compatible with the current version of Wazuh dashboard:
1. Stop the Wazuh dashboard service

- systemd
```
systemctl stop wazuh-dashboard
```
2. Remove the plugin
```
sudo -u wazuh-dashboard /usr/share/wazuh-dashboardbin/opensearch-dashboards-plugin remove <plugin_id>
```

3. Install the plugin
```
sudo -u wazuh-dashboard /usr/share/wazuh-dashboardbin/opensearch-dashboards-plugin install <plugin_id>
```
> Replace the `<plugin_id>` with the ID of the plugin to install. For example, you can check the list of removed (for Wazuh dashboard 4.4.1) here: https://github.com/wazuh/wazuh-packages/blob/v4.4.1/stack/dashboard/base/builder.sh#L165-L169

4. Restart the Wazuh dashboard service

- systemd
```
systemctl restart wazuh-dashboard
```

### References

- Removed plugins in Wazuh dashboard 4.4.1: https://github.com/wazuh/wazuh-packages/blob/v4.4.1/stack/dashboard/base/builder.sh#L165-L169
- Issue to remove some plugins: https://github.com/wazuh/wazuh-packages/issues/1564