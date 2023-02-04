import React from "react"
import { Layout, Card } from "../../components"
import { graphql, navigate } from "gatsby"

export default function Apps(props) {
  const { nodes } = props.data.allAppsJson

  return (
    <Layout>
      <div className="d-flex mb-s" style={{ flexWrap: "wrap", gap: "10px" }}>
        {nodes.map((node) => (
          <div style={{ flexBasis: "33.33%", width: "100%" }} key={node.name}>
            <Card
              title={node.name}
              description={node.description}
              onClick={() => {
                navigate(node.slug)
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
