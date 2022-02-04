import React from "react"
import "./spacer.css"

export const Spacer = ({ size = "m" }) => (
  <div className={`spacer-${size}`}></div>
)
