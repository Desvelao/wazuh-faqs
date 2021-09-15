import React, {useRef} from "react"

export const LabelCheckbox = ({label, onChange}) => {
    const inputRef = useRef();
    return (
        <label key={label} className={`label cursor-pointer ${inputRef && inputRef.current && inputRef.current.checked ? "" : "background-color-disabled"}`}>
            <input 
                style={{display: "none"}}
                type="checkbox"
                name={label}
                value={label}
                onChange={onChange}
                ref={inputRef}
            />{label}
        </label>
    )
}
