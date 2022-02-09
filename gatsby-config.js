module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
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
