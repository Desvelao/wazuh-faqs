---
slug: "wazuh-app-for-kibana-missing-token-cookie"
date: "2021-10-08"
title: "Error 429 on healthcheck missing API"
author: ""
description: "Ensure the wz-token is stored properly"
tags: [ "kibana", "healthcheck", "429", "cookies", "wz-token" ]
version: ""
---

### Issue

When attempting to log in, after a while, several toasts for 429 errors appear.
Inspecting the cookies, there is no wz-token cookie
The response headers for login set cookies in secure mode but the page is http
The user has a nginx server.

### Remediation

It seems like Kibana is configured to use `https` but the `nginx` instance is presenting an `http` page. The user should set their nginx to serve `https` pages instead.
