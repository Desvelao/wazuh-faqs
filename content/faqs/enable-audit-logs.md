---
slug: "enable-audit-logs"
date: "2022-09-23"
title: "Enable audit logs"
author: ""
description: "Enable the audit logs"
tags: [ "audit", "logs"]
version: ""
---

### Issue
Enable the audit logs

### Remediation

Enable the logging for the audit logs, adding to the configuration:

- **Elasticsearch with Open Distro for Elasticsearch:**
```xml
opendistro_security.audit.type:: <debug|internal_opensearch|external_elasticsearch|webhook|log4j>
```

[Documentation](https://opendistro.github.io/for-elasticsearch-docs/docs/security/audit-logs/)

- **OpenSearch/Wazuh indexer**:

```xml
plugins.security.audit.type: <debug|internal_opensearch|external_opensearch|webhook|log4j>
```

[Documentation](https://opensearch.org/docs/1.2/security-plugin/audit-logs/storage-types/)
