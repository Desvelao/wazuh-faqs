import React from 'react'

export function SearchBar({onChange, value}){
    return (
        <>
            <input
                className="input"
                placeholder="Search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "70%" }}
                />
            <span
                className="cursor-pointer"
                onClick={() => onChange("")}
                >
                ✖
            </span>
        </>
    )
}