import React from "react"
import { Layout, Card, Callout, Copyable } from "../../components"
import { graphql, navigate } from "gatsby"
import { SearchBar } from "../../components/search_bar/search_bar"
import { ButtonFlyout } from "../../components/button/button-flyout"
import "./index.css"

export default function Apps(props) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const { nodes } = props.data.allAppsJson

  React.useEffect(() => {
    const params = new URLSearchParams(props.location.search)
    const querySearch = params.get("q")
    if(querySearch){
      setSearchTerm(querySearch)
      params.delete("q")
      navigate("/apps", {replace: true})
    }
  },[])

  const apps = searchTerm ? nodes.filter(({name, description}) => [name, description].some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))) : nodes

  return (
    <Layout buttons={
      <div>
        <ButtonFlyout label='Tips'>
          <div className="mb-s">Tips</div>
          <div className="mb-s">
            <Callout type="info">
              <strong>Tip:</strong> you can search in these apps through a browser search engine. Add it to your browser: <Copyable copy={`${props.location.href}?q=%s`}>
                <code>{props.location.href}?q=%s</code>
              </Copyable>.
            </Callout>
          </div>
        </ButtonFlyout>
      </div>
    }>
      <div className="mb-s apps-search-bar">
        <SearchBar onChange={setSearchTerm} value={searchTerm}></SearchBar>
      </div>
      <div className="mb-s apps-layout">
        {apps.map((node) => (
          <Card
            key={node.name}
            title={node.name}
            description={node.description}
            onClick={() => {
              navigate(node.slug)
            }}
          ></Card>
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
