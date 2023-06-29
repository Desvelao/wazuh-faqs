---
slug: "elasticsearch-reached-shards-limit-by-node"
date: "2020-09-15"
title: "Reached the shards limit by node"
author: ""
description: "shards limits"
tags: [ "elasticsearch", "shards", "wazuh-indexer" ]
version: ""
---

### Issue

Error in Elasticsearch/Wazuh indexer:

```
"Validation Failed: 1: this action would add [2] total shards, but this cluster currently has [999]/[1000] maximum shards open;"
```

### Remediation

This means the shards limit count was reached (`1000` by default in the node). To fix this issue, there are multiple options:

- **Delete indices**. This frees shards. You could do it with old indices you don't want/need. Or even, you could automate it with ILM/ISM policies to delete old indices after a period of time as explained in this post: https://wazuh.com/blog/wazuh-index-management.
Note:
  - ILM: Index Lifecycle Management (used by X-Pack)
  - ISM: Index State Management (used by Open Distro for Elasticsearch and OpenSearch)

The automation of the indices deletion through ILM/ISM policies is recommended because reduces manual maintenance.

- **Add more nodes** to your Elasticserach/Wazuh indexer cluster.

- **Increment the max shards per node** (not recommended). But if you do this option, make sure you do not increase it too much, as it could cause inoperability and performance issues in your Elasticsearch/Wazuh indexer cluster. To do this:

  ```sh
  curl -k -u USERNAME:PASSWORD -XPUT ELASTICSEARCH_HOST_ADDRESS/_cluster/settings -H "Content-Type: application/json" \
  -d '{ "persistent": { "cluster.max_shards_per_node": "MAX_SHARDS_PER_NODE" } }'
  ```

  replace the placeholders, where:
  - `USERNAME` : username to do the request
  - `PASSWORD` : password for the user
  - `ELASTICSEARCH_HOST_ADDRESS`: Elasticsearch/Wazuh indexer host address. Include the protocol https if needed.
  - `MAX_SHARDS_PER_NODE`: Maximum shards by node. Maybe you could try with 1200 o something like that, depending of your case.

- **Reduce the shards consumed by the indices**: reduce the shards of existent indices and configure if possible for the new ones.
  - `wazuh-alerts-4.x-*` indices: https://documentation.wazuh.com/current/user-manual/elasticsearch/elastic-tuning.html#shards-and-replicas.
  - `wazuh-monitoring-*` and `wazuh-statistics-*` indices: they can be configured in the Wazuh plugin settings from the UI `Settings/Configuration` or through the configuration file `wazuh.yml`.
  - General application https://opster.com/guides/elasticsearch/capacity-planning/elasticsearch-reduce-shards/.

More info: https://www.elastic.co/blog/how-many-shards-should-i-have-in-my-elasticsearch-cluster.
