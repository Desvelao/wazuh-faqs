---
slug: "/faqs/filebeat-enable-wazuh-archives"
date: "2020-09-15"
title: "Enable Wazuh archives"
description: "archives"
tags: "filebeat,archives"
version: ""
---

### Problem

```
Enable `archives` of wazuh Filebeat module
```

### Solution

1. Edit the Filebeat configuration `filebeat.ym` located in `/etc/filebeat/filebeat.yml`. Enable the module changing the `archives` `enabled` property to `true`.

```
filebeat.modules:
  - module: wazuh
    alerts:
      enabled: true
    archives:
      enabled: true
```

2. Restart Filebeat service. Depending on the process manager:

```
systemctl restart filebeat
# or
service restart filebeat
```

