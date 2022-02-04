export const FilebeatInfo = {
  name: "Filebeat",
  description:
    "Lightweight shipper for forwarding and centralizing log data. Installed as an agent on your servers, Filebeat monitors the log files or locations that you specify, collects log events, and forwards them either to Elasticsearch or Logstash for indexing.",
  documentationLink:
    "https://www.elastic.co/guide/en/beats/filebeat/7.10/filebeat-overview.html",
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
            value: "/usr/share/filebeat",
          },
          {
            description: "Configuration file",
            value: "/etc/filebeat/filebeat.yml",
          },
          {
            description: "Logs",
            value: "/var/log/filebeat/filebeat",
          },
          {
            description: "Service",
            value: "filebeat",
          },
        ],
      },
    },
  ],
  commands: [
    {
      label: "Update pipelines",
      value: "filebeat setup --pipelines",
    },
    {
      label: "Update template",
      value: "filebeat setup --index-management",
    },
  ],
  debug: [
    {
      label: "Logs - Get errors or warning",
      value: 'cat /var/log/filebeat/filebeat | grep -i -E "err|warn"',
    },
  ],
}