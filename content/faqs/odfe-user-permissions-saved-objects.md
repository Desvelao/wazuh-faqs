---
slug: "odfe-user-permissions-saved-objects"
date: "2020-09-15"
title: "Share saved objects"
author: ""
description: "Give to an user permissions for specific saved objects"
tags: [ "odfe", "kibana", "saved-objects", "permissions" ]
version: ""
---

### Issue

Share saved objects in ODFE.

### Remediation

You could use the ODFE tenants to get it. You create and save the dashboard/visualization/index pattern under a tenant and you give permissions to a user to read (or read and write) so this can see them in the specific tenant is selected.

Documentation:
ODFE tenants: https://opendistro.github.io/for-elasticsearch-docs/docs/security/access-control/multi-tenancy/

Follow the next steps:

1. In Kibana, go to Security plugin and access to Tenant and push Create tenant and fill the form with at least the tenant name
2. Use an existent role or create a specific role to give permissions to Read or Read and write in the tenant, you created in the last step and map the user you want to get the role.
3. With a user that can write in the tenant, be sure to select the tenant you created (you can switch it by clicking on the user avatar), create the saved object (dashboard, visualization, index pattern) you want to share with another user that has permissions to read in the tenant.
4. Log in with a user that has permission to read in the tenant you created and have the dashboard. Be sure to select the tenant which contains the saved object and the user should be able to see it.
