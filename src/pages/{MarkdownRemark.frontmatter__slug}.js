import React, { useState } from "react"
import { graphql } from "gatsby"
import { Button, Layout, Tag } from "../components"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  ...rest
}) {
  const { markdownRemark:  { frontmatter, html } } = data // data.markdownRemark holds the post data
  const [fetchSolutionText, setFetchSolutionText] = useState(null);

  return (
    <Layout>
        <div className="markdown blog">
            <h1 style={{display: 'inline'}}>{frontmatter.title}</h1>
            <Button onClick={() => {
              if(!fetchSolutionText){
                const fileUrl = `https://raw.githubusercontent.com/Desvelao/wazuh-faqs/main/src/markdown/${frontmatter.slug}.md`
                console.log(`Fetching file: ${fileUrl}`)
                fetch(fileUrl)
                  .then(response => response.text())
                  .then(response => getFAQSolutionFromMarkdown(response))
                  .then(response => {
                    setFetchSolutionText(response)
                    copyToClipboard(response)
                    console.log(response)
                  })
              }else{
                copyToClipboard(fetchSolutionText)
              }
            }}>Copy solution</Button>
            <div>
              {frontmatter.tags && frontmatter.tags.split(",").map(tag => <Tag key={tag} tag={tag} />)}
            </div>
            <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    </Layout>
  )
}

const copyToClipboard = (str) => {
  console.log('COPY', str)
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  el.style.display = "hidden"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}

const getFAQSolutionFromMarkdown = (str) => str.match(/### Solution\n\n([\s\S]*)/) ? str.match(/### Solution\n\n([\s\S]*)/)[1] : str

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
      }
    }
  }
`