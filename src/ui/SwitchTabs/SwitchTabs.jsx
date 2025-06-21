import React, { useState } from "react";
import scss from "./SwitchTabs.module.scss";

const SwitchTabs = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className={scss.switchingTabs}>
      <div className={scss.tabItems}>
        {data.map((tab, index) => (
          <span
            key={index}
            className={`${scss.tabItem} ${
              selectedTab === index ? "active" : ""
            }`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span className={scss.movingBg} style={{ left }} />
      </div>
    </div>
  );
};

export default SwitchTabs;
