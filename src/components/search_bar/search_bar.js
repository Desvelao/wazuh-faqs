import React from 'react'
import './index.css'

export function SearchBar({onChange, value}){
    return (
        <div className="search-bar">
            <input
                className="input"
                placeholder="Search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                />
            <span
                className="cursor-pointer"
                onClick={() => onChange("")}
                >
                ×
            </span>
        </div>
    )
}