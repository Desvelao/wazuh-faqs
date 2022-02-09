import React, { useState } from "react"
import "./tabs.css"
import { classNames } from "../../utils"

export const Tabs = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id)

  return (
    <>
      <div className="tabs">
        <ul>
          {tabs.map((tab) => (
            <li
              className={`cursor-pointer ${classNames({
                "tab-selected": tab.id === selectedTab,
              })}`}
              onClick={() => setSelectedTab(tab.id)}
              key={`tab-${tab.id}`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      <div>{tabs.find((tab) => tab.id === selectedTab).render()}</div>
    </>
  )
}
