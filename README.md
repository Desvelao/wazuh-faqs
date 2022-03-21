<h1 align="center">
  Wazuh FAQs
</h1>

## Description

This repository contains information about how to solve some frequently asked questions related to Wazuh and its environment (Kibana, Elasticsearch, Filebeat, X-Pack, Open Distro for Elasticsearch). This is exposed in a [static web](https://desvelao.github.io/wazuh-faqs/) created with [GatsbyJS](https://www.gatsbyjs.com/).

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

- Downlaod the docker image
```
docker pull node:14.15-alpine3.13
```

- Create a container to install dependencies
```
docker run -itd --rm -w "/home/node/app" -v "$(pwd):/home/node/app" node:14.15-alpine3.13 npm install
```

- Create a container to develop
```
docker run -itd --rm --name wazuh-faqs -w "/home/node/app" -v "$(pwd):/home/node/app" -p "8000:8000" node:14.15-alpine3.13 sh -c "npm install -g gatsby-cli && gatsby develop -H \"0.0.0.0\""
```

3.  **Learn more**

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)

## Guides

    TODO
