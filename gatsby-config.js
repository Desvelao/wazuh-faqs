module.exports = {
  siteMetadata: {
    author: "Desvelao",
    siteUrl: "https://desvelao.github.io/wazuh-faqs",
    title: "Wazuh - FAQs",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "faqs",
        path: `${__dirname}/src/data/faqs`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "apps",
        path: `${__dirname}/src/data/apps`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-transformer-json",
  ],
  pathPrefix: "/wazuh-faqs",
}
