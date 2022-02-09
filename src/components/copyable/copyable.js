import React from "react"
import { copyToClipboard } from "../../utils"
import { Tooltip } from "../tooltip/tooltip"

export const Copyable = ({ copy, children }) => (
  <span
    className="cursor-pointer"
    onClick={() => copyToClipboard(copy || children)}
  >
    <Tooltip content="Copy">{children}</Tooltip>
  </span>
)
