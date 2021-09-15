import React from "react"
import "./button.css"

export const Button = ({children, ...rest}) => (
    <button {...rest} className={`button ${rest.className ? rest.className : ''}`}>{children}</button>
)
