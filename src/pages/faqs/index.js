import React, { useEffect } from "react"
import { graphql, navigate } from "gatsby"
import { useState } from "react"
import { Card, LabelCheckbox, Tag, Layout } from "../../components"

function FAQsIndex({ data, location }) {
  const { allMarkdownRemark } = data
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTags, setFilterTags] = useState([])
  const onChangeSelectTag = (e) => {
    setFilterTags([
      ...filterTags.filter((tag) => tag !== e.target.value),
      ...(e.target.checked ? [e.target.value] : []),
    ])
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const querySearch = params.get("q")
    if(querySearch){
      setSearchTerm(querySearch)
      params.delete("q");
      navigate("/faqs", {replace: true})
    }
  },[])
  return (
    <Layout>
      <div className="mb-8">
        <div className="d-flex">
          <div
            className="mb-4 ml-4 mr-4"
            style={{ minWidth: "15%", flexBasis: "15%" }}
          >
            <div className="mb-8">
              <input
                className="input mb-8 mr-8"
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
            <div className="mb-8 t-center">Filter by tags</div>
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
                  <div className="mr-4 mb-8 ml-4" key={tag}>
                    <LabelCheckbox label={tag} onChange={onChangeSelectTag} />
                  </div>
                ))}
            </div>
          </div>
          <div className="ml-4 mr-4">
            <div className="d-flex mb-4" style={{ flexWrap: "wrap" }}>
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
                      className="mb-4 ml-4 mr-4"
                      title={frontmatter.title}
                      description={frontmatter.description}
                      tags={frontmatter.tags.split(",").map((tag) => (
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
  }
`
