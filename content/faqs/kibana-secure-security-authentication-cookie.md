---
slug: "kibana-secure-security-authentication-cookie"
date: "2022-03-01"
title: "Secure the secutirity_authentication cookie"
author: ""
description: "Secure the secutirity_authentication cookie in Kibana using Open Distro for Elasticsearch"
tags: [ "kibana", "secure", "cookie", "odfe" ]
version: ""
---

### Issue

Add the `Secure` flag for the `security_authentication` cookie.

### Remediation

The `security_authentication` cookie comes from the `security` plugin for Kibana of Open Distro for Elasticsearch.

Follow the next steps:

1. Add to the Kibana configuration file (by default `/etc/kibana/kibana.yml`), the setting:
```yml
opendistro_security.cookie.secure: true
```

It is required that the SSL is enabled for Kibana. You need a certificate to configure SSL. Add the next setting to the Kibana configuration file:
```yml
server.ssl.enabled: true
server.ssl.certificate: <PATH_TO_KIBANA_CERTIFICATE>
server.ssl.key: <PATH_TO_KIBANA_KEY>
```
replace `<PATH_TO_KIBANA_CERTIFICATE>` and `<PATH_TO_KIBANA_KEY>` for your case.


2. Restart Kibana.
```sh
# depending on your service manager
systemctl restart kibana
# or
service kibana restart
```
