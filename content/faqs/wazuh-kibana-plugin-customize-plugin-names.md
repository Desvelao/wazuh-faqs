---
slug: "wazuh-kibana-plugin-customize-plugin-names"
date: "2022-07-20"
title: "Customize the plugin title and plugin category label in the sidebar"
author: ""
description: "Customize the plugin title and plugin category label in the sidebar"
tags: [ "wazuh-app", "wazuh-app-customization" ]
version: ""
---

The next modifications are done in the production plugin code.

# Plugin title
```sh
sed -i 's|title:"Wazuh"|title:"<PLUGIN_TITLE>"|g' <PATH_TO_WAZUH_PLUGIN_ROOT>/target/public/wazuh.plugin.js
```
where:
- <PLUGIN_TITLE> plugin title.
- <PATH_TO_WAZUH_PLUGIN_ROOT> path to the Wazuh plugin root.

# Plugin category label
```sh
sed -i 's|label:"Wazuh"|label:"<PLUGIN_CATEGORY_LABEL>"|g' <PATH_TO_WAZUH_PLUGIN_ROOT>/target/public/wazuh.plugin.js
```
where:
- <PLUGIN_CATEGORY_LABEL> plugin category label.
- <PATH_TO_WAZUH_PLUGIN_ROOT> path to the Wazuh plugin root.

Any changes in `wazuh.plugin.js` (plugin title, plugin category label or both) requires to building the compressed files. It requires `gzip` and `brotli` packages.
```sh
gzip -c <PATH_TO_WAZUH_PLUGIN_ROOT>/target/public/wazuh.plugin.js > <PATH_TO_WAZUH_PLUGIN_ROOT>/target/public/wazuh.plugin.js.gz
brotli -c <PATH_TO_WAZUH_PLUGIN_ROOT>/target/public/wazuh.plugin.js > <PATH_TO_WAZUH_PLUGIN_ROOT>/target/public/wazuh.plugin.js.br
```
where:
- <PATH_TO_WAZUH_PLUGIN_ROOT> path to the Wazuh plugin root.

> The `wazuh.plugin.js` file path can change in the commands if it use relative path. The guide uses absolute paths.

# Example

Change:
 - plugin title: `Custom plugin`
 - plugin category label: `Custom category`

```sh
# Change plugin title
sed -i 's|title:"Wazuh"|title:"Custom plugin"|g' /usr/share/wazuh-dashboard/plugins/wazuh/target/public/wazuh.plugin.js

# Change plugin category label
sed -i 's|label:"Wazuh"|label:"Custom category"|g' /usr/share/wazuh-dashboard/plugins/wazuh/target/public/wazuh.plugin.js

# Build compressed files
gzip -c /usr/share/wazuh-dashboard/plugins/wazuh/target/public/wazuh.plugin.js > /usr/share/wazuh-dashboard/plugins/wazuh/target/public/wazuh.plugin.js.gz
brotli -c /usr/share/wazuh-dashboard/plugins/wazuh/target/public/wazuh.plugin.js > /usr/share/wazuh-dashboard/plugins/wazuh/target/public/wazuh.plugin.js.br
```
