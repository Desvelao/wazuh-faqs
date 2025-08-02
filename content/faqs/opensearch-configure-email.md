---
slug: "opensearch-configure-email"
date: "2025-05-16"
title: "Configure Gmail account to send emails in Wazuh indexer/OpenSearch"
author: "Desvelao"
description: ""
tags: [  "alerting", "email", "notifications", "opensearch", "wazuh-indexer" ]
version: ""
---

### Issue

Error configuring SMTP email sender using a Gmail account.

### Remediation

You need to add the credentials for the SMTP sender configured in Wazuh dashboard/OpenSearch. You will need to use an app password instead of the account password for the Gmail account. You can generate an app password for Gmail account here: https://myaccount.google.com/apppasswords.

#### Wazuh indexer

Then, you need to define the credentials in the Wazuh indexer host:

- Wazuh indexer:
```
echo "<EMAIL>" | sudo -u wazuh-indexer /usr/share/wazuh-indexer/bin/opensearch-keystore add opensearch.notifications.core.email.<SENDER_NAME>.username --
echo "<APP_PASSWORD>" | sudo -u wazuh-indexer /usr/share/wazuh-indexer/bin/opensearch-keystore add opensearch.notifications.core.email.<SENDER_NAME>.password --

```

- OpenSearch:
```
echo "<EMAIL>" | sudo -u opensearch /usr/share/opensearch/bin/opensearch-keystore add opensearch.notifications.core.email.<SENDER_NAME>.username --
echo "<APP_PASSWORD>" | sudo -u opensearch /usr/share/opensearch/bin/opensearch-keystore add opensearch.notifications.core.email.<SENDER_NAME>.password --
```

replace the placeholders, where:
- `<EMAIL>`: the Gmail account (e.g. exa...@gmail.com) you defined in the SMTP sender configured in the Notification app of the Wazuh dashboard
- `<APP_PASSWORD>`: the generated app password for the Gmail account
- `<SENDER_NAME>`: the name of the SMTP sender configured in the Notification app of the Wazuh dashboard

Then, restart the `wazuh-indexer`/`opensearch` service:
- Wazuh indexer:
```
systemctl restart wazuh-indexer
```

- OpenSearch:
```
systemctl restart opensearch
```

Then you could try to send a test email when creating the notification channel in the Notifications app of the Wazuh dashboard/OpenSearch dashboards to check it is working correctly.

References:

- Gmail app password reference: https://support.google.com/mail/answer/185833?hl=en
- Configure app password: https://myaccount.google.com/apppasswords