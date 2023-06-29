---
slug: "wazuh-app-for-kibana-permission-deploy-new-agent"
date: "2022-09-23"
title: "Permission error in the Deploy new agent page"
author: ""
description: "Error \"This section could not be displayed because you do not have permission to get access to the registration service.\" in the Deploy new agent page."
tags: [ "wazuh-app", "permissions" ]
version: ""
---

### Issue

Error `This section could not be displayed because you do not have permission to get access to the registration service.` in the **Deploy new agent** page.

### Remediation

The message `This section could not be displayed because you do not have permission to get access to the registration service.` is displayed in the **Deploy agent** page because of the current user could not retrieve the information about the registration service.

Secure the user has the next permission:
action: `agent:read`
resource: `agent:id:000`
effect: `allow`

You could create a custom policy, assing this policy to a custom role and assign this role to the target user in the `Security` section of the Wazuh plugin.
