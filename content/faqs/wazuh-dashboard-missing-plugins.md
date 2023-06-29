---
slug: "wazuh-dashboard-missing-plugins"
date: "2023-04-28"
title: "Wazuh dashboard missing plugins"
author: ""
description: ""
tags: [ "anomaly-detection", "wazuh-dashboard", "wazuh-dashboard-plugins" ]
version: ""
---

### Issue

Wazuh dashboard missing plugins.

### Remediation

Depending on the Wazuh dashboard version, some plugins could not be included in the default installation comparing to the OpenSearch Dashboards base version that is based on.

They can be installed again. Follow the next steps:

1. Go to the Wazuh dashboard installation directory
```
cd /usr/share/wazuh-dashboard
```
2. Install the plugin
```
bin/opensearch-dashboards-plugin install <plugin_id>
```
> Replace the `<plugin_id>` with the ID of the plugin to install. For example, you can check the list of removed (for Wazuh dashboard 4.4.1) here: https://github.com/wazuh/wazuh-packages/blob/v4.4.1/stack/dashboard/base/builder.sh#L165-L169

3. Restart the Wazuh dashboard service

- systemd
```
systemctl restart wazuh-dashboard
```

- SysV
```
service wazuh-dashboard restart
```

Now, the plugin should be visible in the Wazuh dashboard menu.

### References

- Removed plugins in Wazuh dashboard 4.4.1: https://github.com/wazuh/wazuh-packages/blob/v4.4.1/stack/dashboard/base/builder.sh#L165-L169
- Issue to remove some plugins: https://github.com/wazuh/wazuh-packages/issues/1564