---
slug: "high-availability"
date: "2024-10-22"
title: "High availability."
author: "Desvelao"
description: "High availability."
tags: [ "HA"]
version: ""
---

### Issue

High availability.

### Remediation

The Wazuh server does not provide the HA feature. If the Wazuh server master goes down some features could not work as agent registration, sync changes in ruleset, etc... The Wazuh server worker could work and send alerts if the related Filebeat is ok and the agents are connected to Wazuh server that are up.

A Load balancer can be configured to distribute the logs load between the Wazuh servers and configure the agent to send the logs to the LB instead of Wazuh server directly.

The Wazuh indexer provides the HA feature. See related docs
