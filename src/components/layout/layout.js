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
    link: "/dev-utils",
    label: "Development utils",
  }
]
const isLinkActive = ({ isPartiallyCurrent, isCurrent, ...rest }, shouldUseIsPartiallyCurrent) => {
  return shouldUseIsPartiallyCurrent
  ? (isPartiallyCurrent ? { style: { color: "black" } } : {})
  : (isCurrent ? { style: { color: "black" } } : {})
};

export function Layout({ children, buttons }) {

  return (
    <>
      <div className="layout_menu">
        <div className="layout_menu_links">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
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
            {buttons && <div className="layout_buttons">{buttons}</div>}
          </div>
        </div>
      </div>
      <div className="layout_main">{children}</div>
    </>
  )
}
