import React, { useEffect, useState, useRef } from "react"
import { copyToClipboard } from "../../utils"
import { Tooltip } from "../tooltip/tooltip"

export const Copyable = ({ copy, children }) => {
  const [copied, setCopied] = useState()
  const timeoutCopied = useRef()

  const onClick = () => {
    copyToClipboard(copy || children)
    setCopied(true)
    timeoutCopied.current = setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  useEffect(() => () => timeoutCopied.current && clearTimeout(timeoutCopied.current), [])

  return (
    <span
      className="cursor-pointer"
      onClick={onClick}
    >
      <Tooltip content={copied ? "Copied!" : "Copy"}>{children}</Tooltip>
    </span>
  )
}
