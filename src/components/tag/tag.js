import React, { useState } from "react"

export const Tag = ({ label, onChange }) => {
  const [isSelected, setIsSelected] = useState(false)

  const onChangeHandler = () => {
    if (onChange) {
      setIsSelected(!isSelected)
      onChange({
        checked: !isSelected,
        value: label,
      })
    }
  }

  return (
    <span
      className={`tag cursor-pointer ${isSelected ? "color-primary-all" : "background-color-disabled"}`}
      onClick={onChangeHandler}
    >
      {label}
    </span>
  )
}
