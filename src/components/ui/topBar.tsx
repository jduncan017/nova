"use client";
import { useState } from "react";
import ButtonComponents from "./ButtonComponent";

interface TopBarProps {
  titles: {
    name: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }[];
  addButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

export default function TopBar({ titles, addButton, children }: TopBarProps) {
  const [selectedTitle, setSelectedTitle] = useState(titles[0]?.name ?? "");

  return (
    <div className="TopBar bg-g3 flex h-[72px] w-full items-center justify-between gap-3 px-8 py-4 text-white shadow-sm">
      {children}
      <div className="SelectButtons flex gap-3">
        {titles.map((title) => (
          <ButtonComponents
            style={selectedTitle === title.name ? "secondary" : "secondary"}
            size="sm"
            onClick={() => {
              setSelectedTitle(title.name);
              title.onClick();
            }}
            key={title.name}
          >
            {title.icon && title.icon}
            <h3 className="text-sm font-medium">{title.name}</h3>
          </ButtonComponents>
        ))}
      </div>
      {addButton && (
        <ButtonComponents
          style="secondary"
          size="sm"
          onClick={addButton.onClick}
        >
          {addButton.icon && addButton.icon}
          <p className="text-sm font-medium">{addButton.label}</p>
        </ButtonComponents>
      )}
    </div>
  );
}

TopBar.displayName = "TopBar";
