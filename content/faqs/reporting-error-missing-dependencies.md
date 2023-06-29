---
slug: "reporting-error-missing-dependencies"
date: "2023-02-07"
title: "Reporting error due to missing dependencies"
author: ""
description: "Reporting error due to missing dependencies. Puppeter."
tags: [ "puppeteer", "reporting", "wazuh-dashboard" ]
version: ""
---

### Issue
```
opensearch-dashboards[763]: {"type":"log","@timestamp":"2023-02-03T07:16:52Z","tags":["error","plugins","reportsDashboards"],"pid":763,"message":"Failed to generate report by id: Error: Protocol error (Target.setDiscoverTargets): Target closed."} 
opensearch-dashboards[763]: {"type":"log","@timestamp":"2023-02-03T07:16:52Z","tags":["error","plugins","reportsDashboards"],"pid":763,"message":"{ Error: Protocol error (Target.setDiscoverTargets): Target closed.\n    at Promise (/usr/share/wazuh-dashboard/plugins/reportsDashboards/node_modules/puppeteer-core/lib/Connection.js:74:56)\n    at new Promise (<anonymous>)\n    at Connection.send (/usr/share/wazuh-dashboard/plugins/reportsDashboards/node_modules/puppeteer-core/lib/Connection.js:73:12)\n    at Function.create (/usr/share/wazuh-dashboard/plugins/reportsDashboards/node_modules/puppeteer-core/lib/Browser.js:34:22)\n    at Launcher.launch (/usr/share/wazuh-dashboard/plugins/reportsDashboards/node_modules/puppeteer-core/lib/Launcher.js:183:37)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\n  message: 'Protocol error (Target.setDiscoverTargets): Target closed.' }"} 
```

### Remediation

This problem is due to missing dependencies.

Install the dependencies and restart the service.

### References
- https://opensearch.org/docs/1.2/dashboards/reporting/#troubleshooting
- https://github.com/opensearch-project/reporting/blob/1.2.0.0/dashboards-reports/rendering-engine/headless-chrome/README.md#additional-libaries

