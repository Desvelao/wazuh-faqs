import React, { useState } from "react"
import { graphql } from "gatsby"
import { Button, Layout, Tag, Spacer } from "../../components"
import { copyToClipboard } from "../../utils"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  ...rest
}) {
  const {
    markdownRemark: { frontmatter, html },
  } = data // data.markdownRemark holds the post data
  const [fetchRemediationText, setFetchRemediationText] = useState(null)

  return (
    <Layout>
      <div className="markdown faq">
        <h1 style={{ display: "inline" }}>{frontmatter.title}</h1>
        {frontmatter.version && <Tag>Version: {frontmatter.version}</Tag>}
        <Button
          onClick={() => {
            if (!fetchRemediationText) {
              const fileUrl = `https://raw.githubusercontent.com/Desvelao/wazuh-faqs/main/src/data/faqs/${frontmatter.slug}.md`
              console.log(`Fetching file: ${fileUrl}`)
              fetch(fileUrl)
                .then((response) => response.text())
                .then((response) => getFAQRemediationFromMarkdown(response))
                .then((response) => {
                  setFetchRemediationText(response)
                  copyToClipboard(response)
                })
            } else {
              copyToClipboard(fetchRemediationText)
            }
          }}
        >
          Copy Remediation
        </Button>
        {frontmatter.tags && (
          <div>
            {frontmatter.tags
              .split(",")
              .map((tag) => <Tag key={tag}>{tag}</Tag>)}
            <Spacer />
          </div>
        )}
        {frontmatter.description && (
          <>
            <div className="color-subdued">{frontmatter.description}</div>
            <Spacer />
          </>
        )}
        <div
          className="faq-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

const reRemediation = /### Remediation\n\n([\s\S]*)/

const getFAQRemediationFromMarkdown = (str) => {
  const [_, result] = str.match(reRemediation) || [null, str]
  return result
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
        version
        description
      }
    }
  }
`
