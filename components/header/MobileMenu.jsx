"use client";

import Image from "next/image";
import useMenus from "@/hooks/useMenus";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { isActiveLink } from "../../utils/linkActiveChecker";
import ContactInfo from "../footer/default/ContactInfo";
import AgentLink from "../AgentLink/AgentLink";

const MobileMenu = ({ menus, logoUrl }) => {
  const pathname = usePathname();
  const menuItems = useMenus(menus);

  const { agentRef, agentCup } = useMemo(() => {
    if (typeof window === 'undefined') return { agentRef: null, agentCup: null };
    
    const urlParams = new URLSearchParams(window.location.search);
    return {
      agentRef: urlParams.get("agentRef"),
      agentCup: urlParams.get("agentCup")
    };
  }, []);

  return (
    <>
      {/* Header with logo */}
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <AgentLink href="/" aria-label="Go to homepage">
          <Image
            style={{ width: "60px", height: "60px" }}
            src={logoUrl || "/placeholder.svg"}
            width={128}
            height={128}
            alt="Dream Tourism SRLS"
          />
        </AgentLink>

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
          role="button"
          tabIndex={0}
        >
          <i className="icon icon-close"></i>
        </div>
      </div>

      {/* Sidebar Menu */}
      <Sidebar width="400" backgroundColor="#fff">
        <Menu>
          {menuItems?.map((menu, idx) =>
            menu?.children.length === 0 ? (
              <MenuItem
                href={menu?.routePath}
                key={menu.id}
                className={
                  pathname === menu?.routePath
                    ? "menu-active-link fw-500"
                    : "fw-500"
                }
                tabIndex={idx + 1}
              >
                {agentRef || agentCup ? (
                  <AgentLink
                    href={menu?.routePath}
                    data-bs-dismiss="offcanvas"
                    aria-label={menu.name}
                  >
                    {menu.name}
                  </AgentLink>
                ) : (
                  menu.name
                )}
              </MenuItem>
            ) : (
              <SubMenu
                key={menu.id}
                label={menu?.name}
                href={menu?.routePath}
                className="fw-500"
              >
                {menu.children.map((item, index) => (
                  <MenuItem
                    tabIndex={index + 1}
                    key={item.id}
                    href={item.routePath}
                    className={
                      isActiveLink(item.routePath, pathname)
                        ? "menu-active-link fw-400"
                        : "inactive-menu fw-400"
                    }
                  >
                    {agentRef || agentCup ? (
                      <AgentLink
                        href={item?.routePath || "/"}
                        data-bs-dismiss="offcanvas"
                        aria-label={item.name}
                      >
                        {item.name}
                      </AgentLink>
                    ) : (
                      item.name
                    )}
                  </MenuItem>
                ))}
              </SubMenu>
            )
          )}

          {/* Contact Menu Item */}
          <MenuItem
            href="/contact"
            className={
              pathname === "/contact" ? "menu-active-link fw-500" : "fw-500"
            }
            tabIndex={menuItems.length + 1}
          >
            {agentRef || agentCup ? (
              <AgentLink
                href={"/contact"}
                data-bs-dismiss="offcanvas"
                aria-label={"Contact"}
              >
                Contact
              </AgentLink>
            ) : (
              <span> Contact</span>
            )}
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>
      <div className="pro-footer">
        <ContactInfo />
      </div>
    </>
  );
};

export default MobileMenu;
