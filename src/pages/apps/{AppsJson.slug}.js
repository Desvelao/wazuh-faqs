import React from "react"
import { Command, Tabs, Table, Spacer, Layout } from "../../components"
import { graphql } from "gatsby"

export default function TemplateDataComponent({
  data: {
    allAppsJson: { nodes },
  },
}) {
  const [{ backup, info, commands, debug, name, description, documentationLink }] =
    nodes
  console.log({nodes})

  return (
    <Layout>
      <div>
        <div style={{ fontSize: "1.5em" }}>{name}</div>
        <div className="text-subdued">{description}</div>
        {documentationLink && (
          <>
            <Spacer size="s" />
            <a href={documentationLink} target="_blank">
              Documentation
            </a>
          </>
        )}
        <Spacer />

        <Tabs
          tabs={[
            {
              id: "info",
              label: "Info",
              render: () => (
                <>
                  {info &&
                    info.map((element, index) => (
                      <div>
                        {element.title && (
                          <>
                            <div>{element.title}</div>
                            <Spacer />
                          </>
                        )}
                        {element.type === "table" && element.contentTable && (
                          <>
                            <Table {...element.contentTable} />
                            <Spacer />
                          </>
                        )}
                        {element.type === "commands" &&
                          element.contentCommands &&
                          element.contentCommands.map((command) => (
                            <>
                              <Command {...command} copyable={true}>
                                {command.value}
                              </Command>
                              <Spacer />
                            </>
                          ))}
                      </div>
                    ))}
                </>
              ),
            },
            {
              id: "backup",
              label: "Backup",
              render: () => (
                <>
                  {backup &&
                    backup.map((element, index) => (
                      <div>
                        {element.title && (
                          <>
                            <div>{element.title}</div>
                            <Spacer />
                          </>
                        )}
                        {element.type === "table" && element.contentTable && (
                          <>
                            <Table {...element.contentTable} />
                            <Spacer />
                          </>
                        )}
                        {element.type === "commands" &&
                          element.contentCommands &&
                          element.contentCommands.map((command) => (
                            <>
                              <Command {...command} copyable={true}>
                                {command.value}
                              </Command>
                              <Spacer />
                            </>
                          ))}
                      </div>
                    ))}
                </>
              ),
            },
            {
              id: "commands",
              label: "Commands",
              render: () => (
                <>
                  {commands.map((command) => (
                    <>
                      <Command {...command} copyable={true}>
                        {command.value}
                      </Command>
                      <Spacer />
                    </>
                  ))}
                </>
              ),
            },
            {
              id: "debug",
              label: "Debug",
              render: () => (
                <>
                  {debug.map((deb) => (
                    <>
                      <Command {...deb} copyable={true}>
                        {deb.value}
                      </Command>
                      <Spacer />
                    </>
                  ))}
                </>
              ),
            },
          ]}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String) {
    allAppsJson(filter: { slug: { eq: $slug } }) {
      nodes {
        name
        info {
          contentCommands {
            label
            value
          }
          contentTable {
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
          title
          type
        }
        backup {
          contentTable {
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
          title
          type
        }
        description
        documentationLink
        icon
        commands {
          label
          value
        }
        debug {
          label
          value
        }
      }
    }
  }
`
