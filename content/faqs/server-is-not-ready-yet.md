---
slug: "server-is-not-ready-yet"
date: "2020-07-06"
title: "Server is not ready yet"
author: ""
description: ""
tags: [ "kibana", "wazuh-dashboard" ]
version: ""
---

### Issue

Message displayed when accessing to the URL where is exposed the platform:
- Kibana server is not ready yet 
- Wazuh dashboard server is not ready yet

### Remediation

This message appears when the platform was initiated recently, but could indicate that there is some error. You should check the platform logs.

Check the logs of your platform:

- Kibana

  - All logs

    ```
    journalctl -u kibana
    ```

  - Filtering by errors or warnings

    ```
    journalctl -u kibana | grep -iE "err|warn"
    ```



- Wazuh dashboard

  - All logs

    ```
    journalctl -u wazuh-dashboard
    ```

  - Filtering by errors or warnings

    ```
    journalctl -u wazuh-dashboard | grep -iE "err|warn"
    ```