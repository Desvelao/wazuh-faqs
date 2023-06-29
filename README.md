<h1 align="center">
  Wazuh FAQs
</h1>

## Description

This repository is a personal compilation of data related to development, debugging and solving some frequently problems (communities) related to [Wazuh](https://wazuh.com/).

The objectives are:
- Summary the local notes
- Expose the notes to be used by other work colleagues. This reduces my inverted time to reply to some questions of work colleagues and provide another source of information.
- Friendly usage to work colleagues (make easy copy-pasting the data). 

It contains data about:
- apps (Kibana, Elasticsearch, Filebeat, X-Pack, Open Distro for Elasticsearch, Wazuh dashboard and Wazuh indexer).
- faqs: some frequently asked questions.
- tools:
  - generator of templates for manual tests (used for pull requests or releases)

This is exposed in a [static web](https://desvelao.github.io/wazuh-faqs/) created with [GatsbyJS](https://www.gatsbyjs.com/).

To get more information about Wazuh, visit its webpage https://wazuh.com/.

Wazuh documentation: https://documentation.wazuh.com/current/index.html.

### Project and personal objectives

My personal objectives building this project are:
- learn and play with GatsbyJS
- build CSS styles from scratch

## 🚀 Quick start

1.  **Requirements**

- Node.js (v12.13 or newer)
- Git
- Gatsby command line interface (CLI) (v3 or newer)

Install `gatsby` globally:

```shell
npm install -g gatsby-cli
```

Check `gatsby` version:

```shell
gatsby --version
```

See the available commands:

```shell
gatsby --help
```

More info: https://www.gatsbyjs.com/docs/tutorial/part-0/#installation-guide

2.  **Developing**

Start the server with:

```shell
npm run develop
```

The server is running at http://localhost:8000.

Edit the files to see your site update in real-time!

### Develop with Docker

- Create a container to install dependencies
```
docker run -itd --rm -w "/home/node/app" -v "$(pwd):/home/node/app" node:14.15-alpine3.13 npm install
```

- Create a container to develop
```
docker run -itd --rm --name wazuh-faqs -w "/home/node/app" -v "$(pwd):/home/node/app" -p "8000:8000" node:14.15-alpine3.13 sh -c "npm install -g gatsby-cli@3.9.0 && gatsby develop -H \"0.0.0.0\""
```

3.  **Learn more**

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

## Guides

### Add content

- [faqs](./content/create_faq.md)

### Styles customization

Some styles can be changed through a centralized file where you can change some properties of components.
