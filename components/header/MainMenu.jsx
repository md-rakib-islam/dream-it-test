import Link from "next/link";
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
        {menuItems?.map((menu) => (
          <li
            key={menu.id}
            className={`${
              isActiveLink(menu?.routePath, currentPathName) ? "current" : ""
            } menu-item-has-children`}
          >
            {menu?.children?.length > 0 ? (
              // Use Link for dropdown parents to make them crawlable
              <AgentLink
                href={
                  menu.name === "Destinations" ? "#" : menu.routePath || "#"
                }
                aria-label={menu.name}
                onClick={(e) => {
                  if (menu.name === "Destinations") {
                    e.preventDefault(); // Prevent navigation
                  }
                }}
                className={
                  menu.name === "Destinations" ? "cursor-not-allowed " : ""
                }
              >
                <span className="mr-10 fw-500">{menu.name}</span>
                <i className="icon icon-chevron-sm-down" />
              </AgentLink>
            ) : (
              <AgentLink href={menu?.routePath} aria-label={menu.name}>
                <span className="mr-10 fw-500">{menu.name}</span>
              </AgentLink>
            )}
            {menu.children.length > 0 && (
              <ul className="subnav">
                {menu.children.map((item) => (
                  <li
                    key={item.id}
                    className={`${
                      isActiveLink(item.routePath, pathname) ? "current" : ""
                    } menu-item-has-children fw-500`}
                  >
                    <AgentLink href={item.routePath} aria-label={item.name}>
                      {item.name}
                    </AgentLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
