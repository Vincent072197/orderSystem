import { useState, type RefObject } from "react";
import { MenuTitle } from "../App";

type NavBarProps = {
  scrollToSection: (title: string) => void;
  currentSection: (typeof MenuTitle)[number];
  navRef: RefObject<HTMLElement>;
};

export default function NavBar({
  scrollToSection,
  currentSection,
  navRef,
}: NavBarProps) {
  return (
    <nav
      ref={navRef}
      className="fixed top-16 left-0 w-full bg-white shadow-sm border-b border-gray-200 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-row justify-center items-center h-16 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {MenuTitle.map((title, idx) => {
            return (
              <Cell
                key={idx}
                title={title}
                isActive={currentSection === title}
                onClick={() => {
                  scrollToSection(title);
                }}
              />
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

const Cell = ({
  title,
  isActive,
  ...rest
}: {
  title: string;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <li
      className={`h-full w-full flex items-center whitespace-nowrap text-gray-700 hover:text-blue-600 cursor-pointer font-medium transition-colors grow `}
    >
      <button
        className={`h-full flex items-center justify-center w-full ${isActive ? "border-b-2 border-red-400" : ""}`}
        {...rest}
      >
        {title}
      </button>
    </li>
  );
};
