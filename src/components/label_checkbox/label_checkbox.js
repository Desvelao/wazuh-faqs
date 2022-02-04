import React, { useRef } from "react"

export const LabelCheckbox = ({ label, onChange }) => {
  const inputRef = useRef()
  return (
    <label
      key={label}
      className={`tag cursor-pointer ${
        inputRef && inputRef.current && inputRef.current.checked
          ? "color-primary-all"
          : "background-color-disabled"
      }`}
    >
      <input
        style={{ display: "none" }}
        type="checkbox"
        name={label}
        value={label}
        onChange={onChange}
        ref={inputRef}
      />
      {label}
    </label>
  )
}
