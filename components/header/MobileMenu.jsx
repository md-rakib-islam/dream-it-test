"use client";
import Image from "next/image";
import Link from "next/link";
import useMenus from "@/hooks/useMenus";
import { usePathname, useRouter } from "next/navigation";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { isActiveLink } from "../../utils/linkActiveChecker";
import ContactInfo from "../footer/default/ContactInfo";
import Social from "../common/social/Social";

const MobileMenu = ({ menus, logoUrl }) => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = useMenus(menus);

  const currentPathName =
    pathname.split("/")[1] === "destinations" ? "/destinations" : pathname;

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <div role="button" tabIndex={0} onClick={() => router.push("/")}>
          <Image
            style={{ width: "60px", height: "60px" }}
            src={logoUrl}
            width={128}
            height={128}
            alt="Dream Tourism SRLS"
          />
        </div>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          role="button"
          tabIndex={0}
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          {menuItems?.map((menu) => {
            if (menu?.children.length === 0) {
              return (
                <MenuItem
                  key={menu.id}
                  onClick={() => router.push(menu?.routePath)}
                  data-bs-dismiss="offcanvas"
                  className={
                    pathname === menu?.routePath
                      ? "menu-active-link fw-500"
                      : "fw-500"
                  }
                >
                  <span role="link" aria-label={`Navigate to ${menu.name}`}>
                    {menu.name}
                  </span>
                </MenuItem>
              );
            } else {
              return (
                <SubMenu
                  key={menu.id}
                  label={menu?.name}
                  className={
                    menu?.children?.some(
                      (item) =>
                        item.routePath?.split("/")[1] ===
                        currentPathName.split("/")[1]
                    )
                      ? "menu-active-link fw-500"
                      : "fw-500"
                  }
                >
                  {menu?.children?.map((item, i) => (
                    <MenuItem
                      key={item.id}
                      onClick={() => router.push(item.routePath)}
                      data-bs-dismiss="offcanvas"
                      className={
                        isActiveLink(item.routePath, pathname)
                          ? "menu-active-link fw-400"
                          : "inactive-menu fw-400"
                      }
                    >
                      <span role="link" aria-label={`Navigate to ${item.name}`}>
                        {item.name}
                      </span>
                    </MenuItem>
                  ))}
                </SubMenu>
              );
            }
          })}

          <MenuItem
            data-bs-dismiss="offcanvas"
            onClick={() => router.push("/contact")}
            className={
              pathname === "/contact" ? "menu-active-link fw-500" : "fw-500"
            }
          >
            <span role="link" aria-label="Navigate to Contact">
              Contact
            </span>
          </MenuItem>
          {/* End Contact Menu */}
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />
        <div className="mt-10">
          <h5 className="text-16 fw-500 mb-10">Follow us on social media</h5>
          <div className="d-flex x-gap-20 items-center">
            <Social />
          </div>
        </div>
      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
