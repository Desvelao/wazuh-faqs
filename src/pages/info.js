import * as React from "react"
import { Layout, Copyable, Spacer } from "../components"
import { Table } from "../../../../../../../mnt/d/Proyectos/gatsby/my-gatsby-site/src/components"
import { FilebeatInfo, KibanaInfo, ElasticsearchInfo } from "../data/components"
import { Tabs } from "../components"

const dataInfo = [FilebeatInfo, KibanaInfo, ElasticsearchInfo]

function GenerateInfo({
  body,
  commands,
  debug,
  description,
  documentationLink,
  name,
}) {
  return (
    <div>
      <div style={{ fontSize: "1.5em" }}>{name}</div>
      <div className="text-subdued">{description}</div>
      {documentationLink && (
        <>
          <Spacer size="s" />
          <a href={documentationLink}>Documentation</a>
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
                {body &&
                  body.map((element, index) => (
                    <div>
                      {element.type === "table" && <Table {...element.data} />}
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
                    <div>{command.label}</div>
                    <Copyable copy={command.value}>
                      <code>{command.value}</code>
                    </Copyable>
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
                    <div>{deb.label}</div>
                    <Copyable copy={deb.value}>
                      <code>{deb.value}</code>
                    </Copyable>
                    <Spacer />
                  </>
                ))}
              </>
            ),
          },
        ]}
      />
    </div>
  )
}

function Info() {
  return (
    <Layout>
      <Tabs
        tabs={dataInfo.map((info) => ({
          id: info.name,
          label: info.name,
          render: () => <GenerateInfo {...info} />,
        }))}
      />
    </Layout>
  )
}

export default Info
