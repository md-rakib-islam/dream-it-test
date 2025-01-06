import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveLink } from "../../utils/linkActiveChecker";
import useMenus from "@/hooks/useMenus";

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
              <Link href={menu.routePath || "#"} aria-label={menu.name}>
                <span className="mr-10 fw-500">{menu.name}</span>
                <i className="icon icon-chevron-sm-down" />
              </Link>
            ) : (
              <Link href={menu?.routePath} aria-label={menu.name}>
                <span className="mr-10 fw-500">{menu.name}</span>
              </Link>
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
                    <Link href={item.routePath} aria-label={item.name}>
                      {item.name}
                    </Link>
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
