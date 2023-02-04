import * as React from "react"
import "./input.css"

export function Input({...rest}){
    return <input
        {...rest}
        className={`input ${rest.className || ''}`}
    />
}