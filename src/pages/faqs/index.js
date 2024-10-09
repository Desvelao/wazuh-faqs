import React, { useEffect, useState } from "react"
import { graphql, navigate } from "gatsby"
import { Callout, Card, Copyable, Tag, Layout } from "../../components"
import { ButtonFlyout } from "../../components/button/button-flyout"
import { SearchBar } from "../../components/search_bar/search_bar"
import "./index.css"

function FAQsIndex({ data, location }) {
  const { allMarkdownRemark } = data
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTags, setFilterTags] = useState([])
  const onChangeSelectTag = ({ checked, value }) => {
    setFilterTags([
      ...filterTags.filter((tag) => tag !== value),
      ...(checked ? [value] : []),
    ])
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const querySearch = params.get("q")
    if(querySearch){
      setSearchTerm(querySearch)
      params.delete("q")
      navigate("/faqs", {replace: true})
    }
  },[])
  return (
    <Layout buttons={
      <div>
        <ButtonFlyout label='Tips'>
          <div className="mb-s">Tips</div>
          <div className="mb-s">
          <Callout type="info">
          <strong>Tip:</strong> you can search in these faqs through a browser search engine. Add it to your browser: <Copyable copy={`${location.href}?q=%s`}>
            <code>{location.href}?q=%s</code>
          </Copyable>.
        </Callout>
          </div>
        </ButtonFlyout>
      </div>
    }>
      <div className="mb-s">
        <div className="container">
          <div
            className="mb-s mx-s"
            style={{ minWidth: "15%", flexBasis: "15%" }}
          >
            <div className="mb-s">
              <SearchBar onChange={setSearchTerm} value={searchTerm}></SearchBar>
            </div>
            <div className="mb-s">Filter by tags</div>
            <div className="checkboxes" style={{ flexWrap: "wrap" }}>
              {allMarkdownRemark.edges
                .map(
                  ({
                    node: {
                      frontmatter: { tags },
                    },
                  }) => tags || []
                )
                .flat()
                .filter((value, index, array) => array.indexOf(value) === index)
                .sort()
                .map((tag) => (
                  <Tag key={tag} label={tag} onChange={onChangeSelectTag} />
                ))}
            </div>
          </div>
          <div className="cards mb-s" style={{ flexWrap: "wrap" }}>
            {allMarkdownRemark.edges
              .filter(
                ({
                  node: {
                    frontmatter: { description, tags, title },
                  },
                }) =>
                  [description, title, ...(tags && tags.length ? tags : [])].some(
                    (k) =>
                      k && k.toLowerCase().includes(searchTerm.toLowerCase())
                  )
              )
              .filter(
                ({
                  node: {
                    frontmatter: { tags },
                  },
                }) =>
                  filterTags.length
                    ? tags.some((tag) => filterTags.includes(tag))
                    : true
              )
              .map(({ node: { frontmatter } }) => (
                <Card
                  key={frontmatter.slug}
                  title={frontmatter.title}
                  description={frontmatter.description}
                  tags={frontmatter.tags.sort().map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                  onClick={() => {
                    navigate(frontmatter.slug)
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FAQsIndex

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }) {
      edges {
        node {
          frontmatter {
            date
            slug
            title
            description
            tags
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
