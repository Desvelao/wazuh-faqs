module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Wazuh - FAQs",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `faqs`,
        path: `${__dirname}/src/markdown/faqs`,
      },
    },
    `gatsby-transformer-remark`,
  ],
  pathPrefix: "/wazuh-faqs",
}
