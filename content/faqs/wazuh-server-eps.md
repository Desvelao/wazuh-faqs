---
slug: "wazuh-server-eps"
date: "2024-04-11"
title: "Wazuh EPS"
author: "Desvelao"
description: "Wazuh EPS (events per second)"
tags:  [ "deployment", "eps", "event" ]
version: ""
---

### Issue
Ensure the Wazuh deployment is balanced about the events collection and analysis

### Remediation

The configuration of a Wazuh environment should be balanced, ensuring the collected events by the Wazuh agents (or Wazuh server themself) are analyzed by the Wazuh server and there are not events lost. If this is not done correctly, could cause events are lost or Wazuh server or agents are overloaded.

The Wazuh agents collect data and send to the Wazuh server to be analyzed, if the Wazuh server receives many events due to many agents connected to the same Wazuh server node, or the agents are sending many events per seconds, could cause the Wazuh server node is flooded and some events could be discarded.

To ensure the configuration of Wazuh deployment is correct, you could:
- Monitor the static files that stores stats of the daemon: https://documentation.wazuh.com/4.7/user-manual/reference/statistics-files/index.html. If the `event_dropped` (`wazuh-analysisd.state`) or `discarded_count` ( `wazuh-remoted.state`) stats are more than 0, then it could indicate the Wazuh server is overloaded.

### Debug

Optional: increase the verbosity of `analysisd` and others daemons: https://documentation.wazuh.com/4.7/user-manual/reference/internal-options.html. After this, restart the Wazuh server, and review the logs after the replicate the problem. Remember to undo the change after debugging problem, because it increases the logs and as result the disk usage.

### Solutions
- Add an anti-flooding mechanim on the Wazuh agent side: It can help to reduce the congestion on them, if there is no an congestion control of the events. Reference: https://documentation.wazuh.com/4.7/user-manual/agent/agent-management/antiflooding.html
- Increase the settings related to resources in the internal options: https://documentation.wazuh.com/4.7/user-manual/reference/internal-options.html


### References
- https://documentation.wazuh.com/4.7/user-manual/reference/statistics-files/index.html
- https://documentation.wazuh.com/4.7/user-manual/agent/agent-management/antiflooding.html
- https://documentation.wazuh.com/4.7/user-manual/reference/internal-options.html
