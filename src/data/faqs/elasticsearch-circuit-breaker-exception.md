---
slug: "elasticsearch-circuit-breaker-exception"
date: "2022-07-20"
title: "Circuit breaker error"
description: "circuit_breaking_exception Data too large error"
tags: "elasticsearch,cricuit-breaker-exception"
version: ""
---

### Issue
`circuit_breaking_exception Data too large, data for [<http_request>]`

### Remediation

Seems like your Elasticsearch is running out of RAM.

The **circuit_breaking_exception** is a mechanism used to prevent operations from causing an **OutOfMemoryError**. It seems like Elasticsearch/Wazuh indexer was using most of the JVM heap configured, and the total memory required for all operations was higher to the memory available, so the operation you requested was aborted.

To fix this problem, increase the heap size, taking in account:
- Use no more than 50% of available RAM.
- Use no more than 32 GB.

Note that the JVM heap min and max The values min (Xms) and max (Xmx) sizes must be the same to prevent JVM heap resizing at runtime as this is a very costly process.

in the `java.options` file of the plugin platform:
- Elasticsearch (package): `/etc/elasticsearch/jvm.options`
- Elasticsearch (Docker): `/usr/share/elasticsearch/config/jvm.options`
- Wazuh indexer (package): `/etc/wazuh-indexer/jvm.options`
- Wazuh indexer (Docker): `/usr/share/wazuh-indexer/config/jvm.options`

#### Example

If you want to increase to 6GB:
```
-Xms6g
-Xmx6g
```

### References
- https://documentation.wazuh.com/current/user-manual/elasticsearch/elastic-tuning.html
- https://stackoverflow.com/questions/61870751/circuit-breaking-exception-parent-data-too-large-data-for-http-request
- https://www.elastic.co/guide/en/elasticsearch/guide/current/heap-sizing.html
