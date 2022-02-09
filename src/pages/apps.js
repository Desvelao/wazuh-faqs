import React from "react"
import { Layout, Card } from "../components"
import { graphql, navigate } from "gatsby"

export default function Apps(props) {
  const { nodes } = props.data.allAppsJson

  return (
    <Layout>
      <div className="d-flex mb-4" style={{ flexWrap: "wrap" }}>
        {nodes.map((node) => (
          <div style={{ flexBasis: "33.33%", width: "100%" }} key={node.name}>
            <Card
              title={node.name}
              description={node.description}
              className="mb-4 ml-4 mr-4"
              onClick={() => {
                navigate(`${node.slug}`)
              }}
            ></Card>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allAppsJson(sort: { order: ASC, fields: name }) {
      nodes {
        icon
        documentationLink
        description
        name
        slug
      }
    }
  }
`
