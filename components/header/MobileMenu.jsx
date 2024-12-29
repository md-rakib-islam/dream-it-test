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
        <Link href="/">
          <Image
            style={{ width: "60px", height: "60px" }}
            src={logoUrl}
            width={128}
            height={128}
            alt="Dream Tourism SRLS"
          />
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
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
                  {menu.name}
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
                        item.routePath?.split("/")[1] ==
                        currentPathName.split("/")[1]
                    )
                      ? "menu-active-link fw-500"
                      : "fw-500"
                  }
                >
                  {menu?.children?.map((item, i) => (
                    <MenuItem
                      data-bs-dismiss="offcanvas"
                      key={item.id}
                      onClick={() => router.push(item.routePath)}
                      className={
                        isActiveLink(item.routePath, pathname)
                          ? "menu-active-link fw-400"
                          : "inactive-menu fw-400"
                      }
                    >
                      {item.name}
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
            Contact
          </MenuItem>
          {/* End Contact  Menu */}
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
        {/* <div className="mt-20">
          <Link
            className=" button -dark-1 px-30 fw-500 text-14 bg-blue-1 h-50 text-white"
            href="/login"
          >
            Become An Expert
          </Link>
        </div> */}
      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
