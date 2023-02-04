import * as React from "react"

export function Flyout({ children, onClose }){
    return (
        <div
            style={{
                position:"fixed",
                width: "30%",
                height: "100vh",
                right: 0,
                top: 0,
                backgroundColor: "white",
                zIndex: 999,
                padding: "10px"
            }}
        >
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <span
                    className="cursor-pointer"
                    onClick={onClose}
                >
                    ✖
                </span>
            </div>
            {children}
        </div>
    )
}