---
slug: "wazuh-indexer-add-node-to-cluster"
date: "2022-06-20"
title: "Add node to Wazuh indexer cluster"
author: ""
description: ""
tags: [ "cluster", "node", "wazuh-indexer" ]
version: ""
---

### Issue

Add node to Wazuh indexer cluster

### Remediation

To add a Wazuh indexer node to an existing cluster you need to follow the default procedure:
https://documentation.wazuh.com/current/installation-guide/wazuh-indexer/step-by-step.html

Take into account that in the certificate creation section you can use your config.yml or download a new one by adding the new node respecting the names of your existing node. Then when you get to the point of Deploying certificates set the variable `NODE_NAME=<indexer-node-name>` with the new node.

Once you have it installed you need to configure the new node to be part of the cluster:
https://documentation.wazuh.com/current/installation-guide/wazuh-indexer/step-by-step.html#configuring-the-wazuh-indexer

Then you must reinitialize the cluster on all nodes:
https://documentation.wazuh.com/current/installation-guide/wazuh-indexer/step-by-step.html#cluster-initialization

After that you will need to add the new wazuh-indexer into the filebeat configuration like explained in the following link:
https://documentation.wazuh.com/current/installation-guide/wazuh-server/step-by-step.html#configuring-filebeat

Finally change the Wazuh dashboard configuration to add the new Wazuh indexer, you can use the following documentation:
https://documentation.wazuh.com/current/installation-guide/wazuh-dashboard/step-by-step.html#configuring-the-wazuh-dashboard

Then you will have the new Wazuh indexer node working on the cluster.
