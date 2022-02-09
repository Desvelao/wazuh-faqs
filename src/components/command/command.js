import React from "react"
import { Copyable } from "../copyable/copyable"
import { Spacer } from "../spacer/spacer"

export const Command = ({ copyable, children, label }) => {
  const wrapper = copyable ? (
    <Copyable copy={children}>
      <code>{children}</code>
    </Copyable>
  ) : (
    <code>{children}</code>
  )
  return (
    <div>
      {label && (
        <>
          <div>{label}</div>
          <Spacer />
        </>
      )}
      {wrapper}
    </div>
  )
}
