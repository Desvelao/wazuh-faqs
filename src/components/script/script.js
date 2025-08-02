import React from "react"
import { Copyable } from "../copyable/copyable"

export const Script = ({ copyable, children, language }) => {
  const script = <code>{children}</code>
  return (
    <div>
      {copyable ? (
        <Copyable copy={children}>
          {script}
        </Copyable>
      ) : (
        script
      )}
    </div>
  )
}
