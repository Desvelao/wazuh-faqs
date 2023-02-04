import React, { useEffect, useState } from "react"
import { graphql, navigate } from "gatsby"
import { Callout, Card, Copyable, LabelCheckbox, Tag, Layout } from "../../components"

function FAQsIndex({ data, location }) {
  const { allMarkdownRemark } = data
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTags, setFilterTags] = useState([])
  const onChangeSelectTag = (event) => {
    setFilterTags([
      ...filterTags.filter((tag) => tag !== event.target.value),
      ...(event.target.checked ? [event.target.value] : []),
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
    <Layout>
      <div className="mb-s">
        <Callout type="info">
          <strong>Tip:</strong> you can search in these faqs through a browser search engine. Add it to your browser: <Copyable copy={`${location.href}?q=%s`}>
            <code>{location.href}?q=%s</code>
          </Copyable>.
        </Callout>
      </div>
      <div className="mb-s">
        <div className="d-flex">
          <div
            className="mb-s mx-s"
            style={{ minWidth: "15%", flexBasis: "15%" }}
          >
            <div className="mb-s">
              <input
                className="input mb-s mr-s"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "70%" }}
              />
              <span
                className="cursor-pointer"
                onClick={() => setSearchTerm("")}
              >
                ✖
              </span>
            </div>
            <div className="mb-s t-center">Filter by tags</div>
            <div className="d-flex" style={{ flexWrap: "wrap" }}>
              {allMarkdownRemark.edges
                .map(
                  ({
                    node: {
                      frontmatter: { tags },
                    },
                  }) => (tags && tags.split(",")) || []
                )
                .flat()
                .filter((value, index, array) => array.indexOf(value) === index)
                .sort()
                .map((tag) => (
                  <div className="mr-s mb-s ml-s" key={tag}>
                    <LabelCheckbox label={tag} onChange={onChangeSelectTag} />
                  </div>
                ))}
            </div>
          </div>
          <div className="mx-s">
            <div className="d-flex mb-s" style={{ flexWrap: "wrap" }}>
              {allMarkdownRemark.edges
                .filter(
                  ({
                    node: {
                      frontmatter: { description, tags, title },
                    },
                  }) =>
                    [description, title, tags].some(
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
                      ? tags.split(",").some((tag) => filterTags.includes(tag))
                      : true
                )
                .map(({ node: { frontmatter } }) => (
                  <div
                    style={{ flexBasis: "33.33%", width: "100%" }}
                    key={frontmatter.slug}
                  >
                    <Card
                      className="mb-s mx-s"
                      title={frontmatter.title}
                      description={frontmatter.description}
                      tags={frontmatter.tags.split(",").sort().map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                      onClick={() => {
                        navigate(frontmatter.slug)
                      }}
                    />
                  </div>
                ))}
            </div>
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
