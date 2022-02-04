import React from "react"
import { copyToClipboard } from "../../utils"

export const Copyable = ({ copy, children }) => (
  <span
    className="cursor-pointer"
    onClick={() => copyToClipboard(copy || children)}
  >
    {children}
  </span>
)
