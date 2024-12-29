"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import MainMenu from "./MainMenu";
import { LayoutContext } from "@/app/LayoutProvider";
import CurrenctyMegaMenu from "./CurrenctyMegaMenu";
import MobileCurrencyMenu from "./MobileCurrencyMenu";
import MobileMenu from "./MobileMenu";
// import CurrenctyMegaMenu from "../CurrenctyMegaMenu";
// import MainMenu from "../MainMenu";
// import MobileCurrencyMenu from "../MobileCurrencyMenu";
// import MobileMenu from "../MobileMenu";

const Header = () => {
  const data = useContext(LayoutContext);
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const changeBackground = () => {
      setNavbar(window.scrollY >= 10);
    };
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const logoUrl = data?.logo ? data?.logo[0]?.cloudflare_favicon : "";

  return (
    <>
      <header className={`header bg-white ${navbar ? "is-sticky" : ""}`}>
        <div className="header__container px-30 sm:px-20">
          <div className="row justify-between items-center">
            <div className="col-auto header_logo_left_space">
              <div className="d-flex items-center">
                <Link href="/" className="header-logo mr-20">
                  <Image
                    unoptimized
                    quality={100}
                    style={{ width: "60px", height: "60px" }}
                    src={!data?.menus ? "/img/Logo_150_px-01.webp" : logoUrl}
                    width={128}
                    height={128}
                    alt="Dream Tourism SRLS"
                    priority={true}
                  />
                </Link>
                <div className="header-menu">
                  <div className="header-menu__content">
                    <MainMenu style="text-dark-1" menus={data?.menus} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex">
                <div className="row x-gap-20 items-center xxl:d-none">
                  <CurrenctyMegaMenu textClass="text-dark-1" />
                  <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div>
                </div>
                <div className="d-none xl:d-flex x-gap-20 items-center pl-30 text-dark-1">
                  <div>
                    <MobileCurrencyMenu />
                  </div>
                  <div>
                    <button
                      className="d-flex items-center icon-menu text-inherit text-20"
                      data-bs-toggle="offcanvas"
                      aria-controls="mobile-sidebar_menu"
                      data-bs-target="#mobile-sidebar_menu"
                    />
                    <div
                      className="offcanvas offcanvas-start  mobile_menu-contnet"
                      tabIndex="-1"
                      id="mobile-sidebar_menu"
                      aria-labelledby="offcanvasMenuLabel"
                      data-bs-scroll="true"
                    >
                      <MobileMenu logoUrl={logoUrl} menus={data?.menus} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
