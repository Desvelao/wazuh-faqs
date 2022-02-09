import React from "react"
import { Link } from "gatsby"
import "./layout.css"

const menuLinks = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/faqs",
    label: "FAQs",
  },
  {
    link: "/apps",
    label: "Apps",
  },
]

export function Layout({ children }) {
  const isPartiallyActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { style: { color: "black" } } : {}
  }
  return (
    <>
      <div className="layout_menu">
        <div className="layout_menu_links">
          <div>
            {menuLinks.map(({ link, label }) => (
              <Link
                key={`layout_link_${link}`}
                {...(link !== "/" ? { getProps: isPartiallyActive } : {})}
                to={link}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="layout_main">{children}</div>
    </>
  )
}
