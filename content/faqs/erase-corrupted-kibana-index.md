---
slug: "erase-corrupted-kibana-index"
date: "2021-09-28"
title: "Erase corrupted kibana index"
author: ""
description: "Steps to remove and reset the Kibana index whent it is corrupted"
tags: [ ".kibana", "kibana", "index", "indices", "delete", "remove" ]
version: ""
---

### Issue

The `.kibana` index gets corrupted.

### Remediation

Sometimes the .kibana index gets corrupted, the causes are variety but normally after many upgrades or due to big size environments.

To solve this problem you should follow the next instructions:

1. Export all saved objects from Kibana:
   - Go to **Kibana (menu) / Stack Management / Saved Objects** and export all of them.
   - It's recommendable do it by chunks to avoid problems importing them latter.
2. Stop Kibana service
3. Delete the .kibana indice using the ES API
   - Execute this curl after modify the url as you need (https, auth headers, etc)
     ```bash
     curl -k -XDELETE http://<ES_ip>/.kibana
     ```
4. Start Kibana service
5. Re import all saved Objects:
   - Go to **Kibana (menu) / Stack Management / Saved Objects** and import all of the previous files exported

> After each upgrad Kibana makes an alias for .kibana index you could try deleting all of them adding `*` at the end of the curl

```bash
curl -k -XDELETE http://<ES_ip>/.kibana*
```
