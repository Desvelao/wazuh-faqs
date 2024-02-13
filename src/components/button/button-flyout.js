import React from "react"
import { Button } from "./button"
import { Flyout } from "../flyout/flyout"

export const ButtonFlyout = ({ children, label, initialIsOpen = false, buttonProps = {}, ...rest }) => {
    const [isOpen, setIsOpen] = React.useState(initialIsOpen);

    return <>
        <Button onClick={() => setIsOpen(state => !state)} {...buttonProps}>{label}</Button>
        {isOpen && (
            <Flyout
                onClose={() => setIsOpen(false)}
            >
                {typeof children === 'function' ? children({isOpen, setIsOpen}) : children}
            </Flyout>
        )}

    </>
}
