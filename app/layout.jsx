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
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="./favicon.ico" />

        {/* google tag manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16717462625"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','AW-16717462625');
            `,
          }}
        />
        {/* Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-PLLX0DKZKJ');
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
      <body>
        <main>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=AW-16636339045"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Provider store={store}>
            <Header3 />
            {children}
            <DefaultFooter />
            <GoogleAnalytics gaId="G-PLLX0DKZKJ" />
            <SrollTop />
            <ChatWidget />
            <CookieConsent />
          </Provider>
        </main>
      </body>
    </html>
  );
}
