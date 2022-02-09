import React from "react"
import "./table.css"
import { Copyable } from "../../../../../../../../home/toni/projects/gatsby/my-gatsby-site/src/components"
import { copyToClipboard } from "../../utils"

export function Table({ columns, rows }) {
  return (
    <table className="table">
      <tr>
        {columns.map((column) => (
          <td>{column.label}</td>
        ))}
      </tr>
      {rows.map((row) => (
        <tr>
          {columns.map((column) => (
            <td
              {...(column.copyable
                ? {
                    onClick: () => copyToClipboard(row[column.id]),
                    className: "cursor-pointer",
                  }
                : {})}
            >
              {column.copyable ? (
                <Copyable>{row[column.id]}</Copyable>
              ) : (
                row[column.id]
              )}
            </td>
          ))}
        </tr>
      ))}
    </table>
  )
}
