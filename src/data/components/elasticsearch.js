export const ElasticsearchInfo = {
  name: "Elasticsearch",
  description:
    "Search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents",
  documentationLink:
    "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html",
  icon: "",
  body: [
    {
      type: "table",
      data: {
        columns: [
          {
            id: "description",
            label: "Description",
          },
          {
            id: "value",
            label: "Value",
            copyable: true,
          },
        ],
        rows: [
          {
            description: "Installation folder",
            value: "/usr/share/elasticsearch",
          },
          {
            description: "Configuration file (package)",
            value: "/etc/elasticsearch/elasticsearch.yml",
          },
          {
            description: "Configuration file (zip)",
            value: "<ELASTICSEARCH_HOME>/config/elasticsearch.yml",
          },
          {
            description: "Logs",
            value: "/var/log/elasticsearch/<CLUSTER_NAME>.log",
          },
          {
            description: "Logs",
            value: "journalctl | grep kibana",
          },
          {
            description: "Port API",
            value: "9200",
          },
          {
            description: "Port Service",
            value: "9600",
          },
          {
            description: "Service",
            value: "elasticserach",
          },
          {
            description: "JVM options file",
            value: "/etc/elasticsearch/jvm.options",
          },
        ],
      },
    },
  ],
  commands: [],
  debug: [
    {
      label: "Logs - get logs filterring by errors or warnings",
      value:
        '/var/log/elasticsearch/<CLUSTER_NAME>.log | grep -i -E "err|warn"',
    },
  ],
}
