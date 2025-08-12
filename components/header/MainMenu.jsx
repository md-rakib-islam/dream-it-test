"use client";

import { usePathname } from "next/navigation";
import { isActiveLink } from "../../utils/linkActiveChecker";
import useMenus from "@/hooks/useMenus";
import AgentLink from "../AgentLink/AgentLink";

const MainMenu = ({ style = "", menus }) => {
  const pathname = usePathname();
  const menuItems = useMenus(menus);

  const currentPathName =
    pathname.split("/")[1] === "destinations" ? "/destinations" : pathname;

  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        {menuItems?.map((menu) => {
          const isDropdown = menu?.children?.length > 0;

          return (
            <li
              key={menu.id}
              className={`${
                isActiveLink(menu?.routePath, currentPathName) ? "current" : ""
              } menu-item-has-children`}
            >
              {/* Parent Menu Link */}
              <AgentLink
                href={menu.routePath || `/${menu.name.toLowerCase()}`}
                aria-label={menu.name}
                className={isDropdown ? "has-dropdown" : ""}
                onClick={(e) => {
                  if (isDropdown && menu.name === "Destinations") {
                    e.preventDefault(); // keep dropdown open instead of navigating
                  }
                }}
              >
                <span className="mr-10 fw-500">{menu.name}</span>
                {isDropdown && <i className="icon icon-chevron-sm-down" />}
              </AgentLink>

              {/* Dropdown Items */}
              {isDropdown && (
                <ul className="subnav">
                  {menu.children.map((item) => (
                    <li
                      key={item.id}
                      className={`${
                        isActiveLink(item.routePath, pathname) ? "current" : ""
                      } fw-500`}
                    >
                      <AgentLink href={item.routePath} aria-label={item.name}>
                        {item.name}
                      </AgentLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainMenu;
