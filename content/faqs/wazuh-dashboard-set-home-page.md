---
slug: "wazuh-dashboard-set-home-page"
date: "2024-06-10"
title: "Set home page"
author: ""
description: "change home page of Wazuh dashboard"
tags:  [ "home", "wazuh-dashboard" ]
version: ""
---

### Issue
Set home page to point to some specific view of Wazuh plugins.

### Remediation

Edit the Wazuh dashboard configuration file `opensearch_dashboards.yml`:

```yml
uiSettings.overrides.defaultRoute: <path_url>
```

Restart the `wazuh-dashboard` service.

#### Example

Set as home the `Security events` dashboard:

```yml
uiSettings.overrides.defaultRoute: /app/wazuh#/overview/?tab=general&tabView=panels
```
