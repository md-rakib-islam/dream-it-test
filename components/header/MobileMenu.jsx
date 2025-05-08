"use client";
import Image from "next/image";
import useMenus from "@/hooks/useMenus";
import { usePathname, useRouter } from "next/navigation";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { isActiveLink } from "../../utils/linkActiveChecker";
import ContactInfo from "../footer/default/ContactInfo";
import Social from "../common/social/Social";
import { useEffect, useState } from "react";

const MobileMenu = ({ menus, logoUrl }) => {
  const pathname = usePathname();
  const router = useRouter();
  const menuItems = useMenus(menus);
  const [agentRef, setAgentRef] = useState(null);
  const [agentCup, setAgentCup] = useState(null);

  useEffect(() => {
    // Extract agent parameters from URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setAgentRef(urlParams.get("agentRef"));
      setAgentCup(urlParams.get("agentCup"));
    }
  }, []);

  // Function to append agent parameters to a path
  const getPathWithParams = (path) => {
    if ((!agentRef && !agentCup) || path === "#") return path;

    const hasParams = path.includes("?");
    const separator = hasParams ? "&" : "?";
    let newPath = path;

    // Add agentRef if it exists
    if (agentRef) {
      newPath = `${newPath}${separator}agentRef=${agentRef}`;
      // If we've added agentRef, any subsequent params need to use & instead of ?
      if (agentCup) {
        newPath = `${newPath}&agentCup=${agentCup}`;
      }
    }
    // If only agentCup exists (no agentRef)
    else if (agentCup) {
      newPath = `${newPath}${separator}agentCup=${agentCup}`;
    }

    return newPath;
  };

  // Custom navigation handler that preserves agent parameters
  const navigateTo = (path) => {
    const fullPath = getPathWithParams(path);
    router.push(fullPath);
  };

  const currentPathName =
    pathname.split("/")[1] === "destinations" ? "/destinations" : pathname;

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <div role="button" tabIndex={0} onClick={() => navigateTo("/")}>
          <Image
            style={{ width: "60px", height: "60px" }}
            src={logoUrl || "/placeholder.svg"}
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
                  onClick={() => navigateTo(menu?.routePath)}
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
                      onClick={() => navigateTo(item.routePath)}
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
            onClick={() => navigateTo("/contact")}
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
          <span className="text-14 mb-10">Follow us on social media</span>
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
