import * as React from "react"
import { Link, navigate } from "gatsby"
import { Layout, Card } from "../../components"

const links = [
    {
        label: "Tests report template",
        description: "Generate a template in Markdown to report the manual testing of UI/backend tests related to the development of Wazuh plugins for Kibana, Wazuh dashboard or Splunk.",
        path: "tests_report_template"
    }
]

export default function DevUtils(){

    return (
        <Layout>
            <div className="mb-s">Development utils</div>
            <div className="d-flex mb-s" style={{ flexWrap: "wrap", gap: "10px" }}>
                {links.map(({description = "", label, path}) => (
                    <div style={{ flexBasis: "33.33%", width: "100%" }} key={label}>
                        <Card
                            title={label}
                            description={description}
                            onClick={() => {
                                navigate(path)
                            }}
                        ></Card>
                    </div>
                ))}
            </div>
        </Layout>
    )
}
