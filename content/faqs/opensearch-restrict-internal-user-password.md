---
slug: "opensearch-restrict-internal-user-password"
date: "2022-10-27"
title: "Validate the internal user password"
author: ""
description: "Validate the internal user password."
tags: [ "opensearch", "secure", "wazuh-indexer" ]
version: ""
---

### Issue
Validate the internal user password.

For example, to force passwords to be more secure.

### Remediation

If you want to run your users’ passwords against some validation, specify a regular expression (regex) in the OpenSearch configuration file (`opensearch.yml`). You can also include an error message that loads when passwords don’t pass validation. 

The passwords can be validated through a regex, to do, you should define the regex:

```xml
plugins.security.restapi.password_validation_regex: VALIDATION_REGEX
```

If the password doesn't pass the regex validation, a custom message can be added:

```xml
plugins.security.restapi.password_validation_error_message: MESSAGE
```

Note that OpenSearch validates only users and passwords created through OpenSearch Dashboards or the REST API.

#### Example

The following example demonstrates how to include a regex so OpenSearch requires new passwords to be a minimum of eight characters with at least one uppercase, one lowercase, one digit, and one special character.

1. Add the OpenSearch configuration.
```xml
plugins.security.restapi.password_validation_regex: '(?=.*[A-Z])(?=.*[^a-zA-Z\d])(?=.*[0-9])(?=.*[a-z]).{8,}'
plugins.security.restapi.password_validation_error_message: "Password must be minimum 8 characters long and must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
```

2. Restart the OpenSearch

### References
- https://opensearch.org/docs/latest/security-plugin/configuration/yaml/#opensearchyml
