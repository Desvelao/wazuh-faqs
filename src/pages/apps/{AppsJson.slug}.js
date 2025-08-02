import React from "react"
import { Command, Table, Spacer, Layout, Script, TabsURLManaged } from "../../components"
import { graphql } from "gatsby"

const RenderDataComponentConfigurationMap = {
  table: ({columns, rows,title, ...props}) => {
    return (<>
      {title && <div>{title}</div>}
      <Table columns={columns} rows={rows} />
    </>)
  },
  text: (props) => {
  return <div>{props.value}</div>},
  script: ({text, ...rest}) => {
    return (
      <>
        {text && <div>{text}</div>}
        <Script {...rest} copyable={true}>
          {rest.value}
        </Script>
    
      </>
    )
  },
  command: ({...rest}) => {
    return (
      <Command {...rest} copyable={true}>
        {rest.value}
      </Command>)
  }
}

function RenderDataComponentGeneric({config, renderMap}){
  return (
    <>
      {config.map(({type, ...rest}) => {
        const Component = renderMap[type];
        const props = rest[type];
        return Component ? <>
            <Component {...props} />
            <Spacer />
          </> : null
      })}
    </>
  )
}

export default function TemplateDataComponent({
  data: {
    allAppsJson: { nodes },
  },
  location
}) {
  const [{ name, description, documentationLink, info_tabs }] =
    nodes

  return (
    <Layout>
      <div>
        <div style={{ fontSize: "1.5em" }}>{name}</div>
        <div className="text-subdued">{description}</div>
        {documentationLink && (
          <>
            <Spacer size="s" />
            <a href={documentationLink} target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </>
        )}
        <Spacer />

        {info_tabs && ( 
          <TabsURLManaged location={location} tabs={info_tabs.map(({label, content}) => ({
            id: label,
            label,
            render: () => <RenderDataComponentGeneric config={content} renderMap={RenderDataComponentConfigurationMap}/>
          }))}/>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String) {
    allAppsJson(filter: { slug: { eq: $slug } }) {
      nodes {
        name
        info_tabs {
          label
          content {
            type
            text {
              value
            }
            script {
              language
              value
              text
            }
            command {
              label
              value
            }
            table {
              title
              columns {
                copyable
                id
                label
              }
              rows {
                description
                value
              }
            }
          }
        }  
      }
    }
  }
`
