import React from "react"
import "./table.css"
import { copyToClipboard } from "../../utils"
import { Copyable } from "../copyable/copyable"

export function Table({ columns, rows }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column) => (
            <td>{column.label}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={`table-row-${rowIndex}`}>
            {columns.map((column, columnIndex) => (
              <td
                {...(column.copyable
                  ? {
                      onClick: () => copyToClipboard(row[column.id]),
                      className: "cursor-pointer",
                    }
                  : {})}
                key={`table-cell-${rowIndex}-${columnIndex}`}
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
      </tbody>
    </table>
  )
}
