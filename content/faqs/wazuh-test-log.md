---
slug: "wazuh-test-log"
date: "2025-07-08"
title: "Test logs"
author: ""
description: ""
tags: [ "alerts", "ruleset-test", "log", "test", "wazuh-logtest" ]
version: "4.x"
---

### Issue

How to test the logs with the Wazuh analysis

### Remediation

Use the **Ruleset test** app in Wazuh dashboard or `/var/ossec/bin/wazuh-logtest` binary in the Wazuh server side.

For logs related to Windows event channel, they can not be tested with the commented tools and this required to apply a change i nthe built-in rules:
https://www.reddit.com/r/Wazuh/comments/13k0p3n/wazuh_ruleset_test_with_windows_event_logs/
> If you apply the change, ensure to revert after testing the related logs.