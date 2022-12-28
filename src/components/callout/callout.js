import React from "react"
import "./callout.css"

export const Callout = ({ children, type, ...rest }) => (
  <div
    {...rest}
    className={`callout callout-${type} ${rest.className ? rest.className : ""}`}
  >
    {children}
  </div>
)
