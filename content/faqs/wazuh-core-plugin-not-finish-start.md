---
slug: "wazuh-core-plugin-not-finish-start"
date: "2025-07-25"
title: "Alerts are not showing in the Wazuh plugin"
author: ""
description: ""
tags: [ "wazuh-dashboard", "wazuh-plugin-core" ]
version: ""
---

### Issue

Wazuh dashboard stops of initialiting due to error:
```
FATAL  Error: Start lifecycle of "wazuhCore" plugin wasn't completed in 30sec. Consider disabling the plugin and re-start.
```

### Remediation

This means the plugin could not execute one of lifecycle methods in the specified time of 30s.

This is usually caused by the initial check of Wazuh server status that does not get response in that time.

Review the connectivity with the configured Wazuh server API hosts. This could be caused by firewall blocked ports, problems in the network or some proxy that is blocking the request.