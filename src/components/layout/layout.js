import React from "react"
import { Link } from "gatsby"
import "./layout.css"

const menuLinks = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/apps",
    label: "Apps",
  },
  {
    link: "/faqs",
    label: "FAQs",
  },
  {
    link: "/dev_utils",
    label: "Development utils",
  }
]
const isLinkActive = ({ isPartiallyCurrent, isCurrent, ...rest }, shouldUseIsPartiallyCurrent) => {
  return shouldUseIsPartiallyCurrent
  ? (isPartiallyCurrent ? { style: { color: "black" } } : {})
  : (isCurrent ? { style: { color: "black" } } : {})
};

export function Layout({ children }) {
  return (
    <>
      <div className="layout_menu">
        <div className="layout_menu_links">
          <div>
            {menuLinks.map(({ link, label }) => (
              <Link
                key={`layout_link_${link}`}
                getProps={(props) => isLinkActive(props, link !== "/")}
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
