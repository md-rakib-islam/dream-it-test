"use client";

import DefaultFooter from "@/components/footer/default";
import Header3 from "@/components/header/header";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SrollTop from "../components/common/ScrollTop";
import { store } from "../store/store";
import "../styles/index.scss";
import CookieConsent from "@/components/cookie/CookieConsent";
import ChatWidget from "@/components/chat/ChatWidget";
import { GoogleAnalytics } from "@next/third-parties/google";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function RootLayout({ children }) {
  useEffect(() => {
    // Initialize AOS only on the client side
    if (typeof window !== "undefined") {
      Aos.init({ duration: 1200, once: true });
    }
    const body = document.body;
    body.removeAttribute("data-new-gr-c-s-check-loaded");
    body.removeAttribute("data-gr-ext-installed");
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="canonical" href="https://dreamtourism.it" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="./favicon.ico" />

        {/* Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-TXJZSJCPCZ');
              `,
          }}
        ></script>

        {/* end*/}
        {/* 
        script for 3rd party for tripadvisor 
        <script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        ></script> */}
      </head>
      <body suppressHydrationWarning={true}>
        <main>
          <Provider store={store}>
            <Header3 />
            {children}
            <DefaultFooter />
            <GoogleAnalytics gaId="G-TXJZSJCPCZ" />
            <SrollTop />
            <ChatWidget />
            <CookieConsent />
          </Provider>
        </main>
      </body>
    </html>
  );
}
