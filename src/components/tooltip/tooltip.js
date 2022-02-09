import React, { useState } from "react"
import "./Tooltip.css"

export const Tooltip = ({
  content,
  children,
  direction = "top",
  delay = 400,
}) => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, delay || 400)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && <div className={`tooltip-tip ${direction}`}>{content}</div>}
    </div>
  )
}
