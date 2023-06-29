---
slug: "wazuh-app-for-kibana-statistics-monitoring-jobs-user-permissions"
date: "2020-09-15"
title: "Wazuh app backend jobs permissions"
author: ""
description: "Give to the Kibana internal user permissions for run Wazuh app backend jobs"
tags: [ "wazuh-app", "wazuh-app-jobs", "permissions" ]
version: ""
---

### Issue

Give to the Kibana internal user permissions for run Wazuh app backend jobs.

### Remediation

The Kibana internal user needs some permissions to do some jobs for the Wazuh app:

- Monitoring: Get and save information about the agents status for each Wazuh API.
- Statistics: Get and save information about the agentscluster status for each Wazuh API.

The Kibana internal user requires permissions to check the existence and save data in to Elasticsearch indices.

- OpenDistro for Elasticsearch:

1. Create a role with the permissions for the indices used for `monitoring` and `statistics` jobs
2. Map the Kibana internal user with the new role created.
3. Restart Kibana

```
systemctl restart kibana
# or
service kibana restart
```

- X-Pack
  You will need to create a new user with a custom role which the required permissions.

1. Create a role with the permissions for the indices used for `monitoring` and `statistics` jobs
2. Create a new user with the same permissions for `kibana_system` and give him/her the new role you created.
3. Restart Kibana

```
systemctl restart kibana
# or
service kibana restart
```
