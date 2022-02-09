import React from "react"
import "./table.css"
import { copyToClipboard } from "../../utils"
import { Copyable } from "../copyable/copyable"

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
