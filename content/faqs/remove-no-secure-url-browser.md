---
slug: "remove-no-secure-url-browser"
date: "2024-05-22"
title: "Remove the untrusted URL from browser"
author: "Desvelao"
description: "Remove the untrusted URL from browser"
author: "Desvelao."
tags: [ "browser", "secure" ]
version: ""
---

### Issue

If you are using self-signed certificates to expose a web, you could get in your browser the URL is untrusted.

Validate the internal user password.

For example, to force passwords to be more secure.

### Remediation

Add the CA self-signed certificate used by the exposed web to the browser. The addition of the certificate depends on your browser.

- Chrome: https://docs.vmware.com/en/VMware-Adapter-for-SAP-Landscape-Management/2.1.0/Installation-and-Administration-Guide-for-VLA-Administrators/GUID-D60F08AD-6E54-4959-A272-458D08B8B038.html