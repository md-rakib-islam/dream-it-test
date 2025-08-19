"use client";

import { useState, useCallback, lazy, Suspense, useEffect, useRef } from "react";
import Image from "next/image";

// 🚀 CRITICAL: Lazy load heavy share components - not needed for LCP
const FacebookShareButton = lazy(() =>
  import("react-share").then((m) => ({ default: m.FacebookShareButton }))
);
const FacebookMessengerShareButton = lazy(() =>
  import("react-share").then((m) => ({
    default: m.FacebookMessengerShareButton,
  }))
);
const WhatsappShareButton = lazy(() =>
  import("react-share").then((m) => ({ default: m.WhatsappShareButton }))
);
const EmailShareButton = lazy(() =>
  import("react-share").then((m) => ({ default: m.EmailShareButton }))
);

const FacebookIcon = lazy(() =>
  import("react-share").then((m) => ({ default: m.FacebookIcon }))
);
const FacebookMessengerIcon = lazy(() =>
  import("react-share").then((m) => ({ default: m.FacebookMessengerIcon }))
);
const WhatsappIcon = lazy(() =>
  import("react-share").then((m) => ({ default: m.WhatsappIcon }))
);
const EmailIcon = lazy(() =>
  import("react-share").then((m) => ({ default: m.EmailIcon }))
);

// 🚀 OPTIMIZATION: Lazy load toast - only when needed
let toast = null;
let ToastContainer = null;

const SharePage = ({ children, fullUrl }) => {
  const [copied, setCopied] = useState(false);
  const [isCopyLoading, setIsCopyLoading] = useState(false);
  const [toastMounted, setToastMounted] = useState(false);
  const [shareDropdownOpen, setShareDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🚀 OPTIMIZATION: Memoize clipboard function
  const copyToClipboard = useCallback(async () => {
    setIsCopyLoading(true);
    setToastMounted(true);

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      
      // Dynamic toast import
      if (!toast) {
        const toastModule = await import("react-toastify");
        toast = toastModule.toast;
        ToastContainer = toastModule.ToastContainer;
        await import("react-toastify/dist/ReactToastify.css");
      }
      
      toast.success("Link copied successfully", { position: "bottom-left" });
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
      
      if (!toast) {
        const toastModule = await import("react-toastify");
        toast = toastModule.toast;
        ToastContainer = toastModule.ToastContainer;
        await import("react-toastify/dist/ReactToastify.css");
      }
      
      toast.error("Failed to copy link", { position: "bottom-left" });
    } finally {
      setIsCopyLoading(false);
    }
  }, [fullUrl]);

  // 🚀 OPTIMIZATION: Handle dropdown toggle
  const toggleShareDropdown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setShareDropdownOpen((prev) => !prev);
  }, []);

  // 🚀 FIX: Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShareDropdownOpen(false);
      }
    };

    if (shareDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [shareDropdownOpen]);

  // 🚀 OPTIMIZATION: Share button loading fallback
  const ShareButtonFallback = () => (
    <div className="d-flex gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-gray-200 rounded-full"
          style={{ width: 32, height: 32 }}
          aria-hidden="true"
        />
      ))}
    </div>
  );

  return (
    <>
      {/* 🚀 OPTIMIZATION: Only render ToastContainer when needed */}
      {toastMounted && ToastContainer && <ToastContainer />}

      <section className="pt-50 js-pin-container">
        <div className="container">
          <div className="row y-gap-30">
            {children}
            <div className="col-xl-4 d-flex justify-content-end align-items-end">
              <div className="row">
                {/* Share Dropdown - Fixed React Controlled */}
                <div className="col-auto share-dropdown-container" ref={dropdownRef}>
                  <button
                    type="button"
                    aria-expanded={shareDropdownOpen}
                    onClick={toggleShareDropdown}
                    className="button px-10 py-10 -blue-1"
                    aria-label="Share this tour"
                    aria-haspopup="true"
                  >
                    <i className="icon-share mr-10" aria-hidden="true"></i>
                    Share
                  </button>

                  {/* 🚀 CRITICAL: React-controlled dropdown - no Bootstrap JS conflicts */}
                  {shareDropdownOpen && (
                    <ul className="share-dropdown-menu" role="menu">
                      <li className="d-flex flex-wrap gap-2" role="none">
                        <Suspense fallback={<ShareButtonFallback />}>
                          <FacebookShareButton url={fullUrl} role="menuitem">
                            <FacebookIcon size={32} round />
                          </FacebookShareButton>

                          <FacebookMessengerShareButton
                            url={fullUrl}
                            role="menuitem"
                          >
                            <FacebookMessengerIcon size={32} round />
                          </FacebookMessengerShareButton>

                          <WhatsappShareButton url={fullUrl} role="menuitem">
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>

                          <EmailShareButton
                            url={fullUrl}
                            subject="Check out this amazing tour!"
                            body="I found this great tour. Check it out here:"
                            role="menuitem"
                          >
                            <EmailIcon size={32} round />
                          </EmailShareButton>
                        </Suspense>

                        {/* Copy Button - Optimized */}
                        <button
                          onClick={copyToClipboard}
                          disabled={isCopyLoading}
                          className="d-flex items-center cursor-pointer border-0 bg-transparent p-1 rounded"
                          style={{ minWidth: 32, minHeight: 32 }}
                          aria-label="Copy link to clipboard"
                          role="menuitem"
                        >
                          {isCopyLoading ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-label="Copying..."
                              style={{ width: 20, height: 20 }}
                            />
                          ) : (
                            <Image
                              src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/80bd75f3-6ddb-4c93-1acf-7b4fb358f200/public"
                              alt="Copy link"
                              width={32}
                              height={32}
                              style={{ objectFit: "contain" }}
                              loading="lazy"
                              quality={75}
                            />
                          )}
                          {copied && (
                            <span
                              className="ml-2 text-success text-sm"
                              aria-live="polite"
                            >
                              Copied!
                            </span>
                          )}
                        </button>
                      </li>
                    </ul>
                  )}
                </div>

                {/* Save Button */}
                <div className="col-auto">
                  <button
                    className="button px-10 py-10 -blue-1 bg-light-2"
                    aria-label="Save this tour to favorites"
                  >
                    <i className="icon-heart mr-10" aria-hidden="true"></i>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 OPTIMIZATION: Minimal critical CSS */}
      <style jsx>{`
        .spinner-border {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          vertical-align: text-bottom;
          border: 0.125em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spinner-border 0.75s linear infinite;
        }

        @keyframes spinner-border {
          to {
            transform: rotate(360deg);
          }
        }

        .share-dropdown-container {
          position: relative;
          display: inline-block;
        }

        .share-dropdown-menu {
          position: absolute;
          bottom: 100%;
          left: 0;
          min-width: 200px;
          padding: 8px;
          margin-bottom: 8px;
          background-color: white;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 6px;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
          z-index: 1000;
          list-style: none;
          animation: fadeInUp 0.2s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .share-dropdown-menu {
            right: 0;
            left: auto;
            min-width: 180px;
          }
        }
      `}</style>
    </>
  );
};

export default SharePage;

// old code was removed, so no need to include it here
// "use client";

// import { useState } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import Loading from "@/app/loading";

// // Lazy-load heavy share buttons (saves initial render time)
// const FacebookShareButton = dynamic(
//   () => import("react-share").then((m) => m.FacebookShareButton),
//   { ssr: false }
// );
// const FacebookMessengerShareButton = dynamic(
//   () => import("react-share").then((m) => m.FacebookMessengerShareButton),
//   { ssr: false }
// );
// const WhatsappShareButton = dynamic(
//   () => import("react-share").then((m) => m.WhatsappShareButton),
//   { ssr: false }
// );
// const EmailShareButton = dynamic(
//   () => import("react-share").then((m) => m.EmailShareButton),
//   { ssr: false }
// );

// const FacebookIcon = dynamic(() =>
//   import("react-share").then((m) => m.FacebookIcon)
// );
// const FacebookMessengerIcon = dynamic(() =>
//   import("react-share").then((m) => m.FacebookMessengerIcon)
// );
// const WhatsappIcon = dynamic(() =>
//   import("react-share").then((m) => m.WhatsappIcon)
// );
// const EmailIcon = dynamic(() => import("react-share").then((m) => m.EmailIcon));

// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SharePage = ({ children, fullUrl }) => {
//   const [copied, setCopied] = useState(false);
//   const [isCopyLoading, setIsCopyLoading] = useState(false);
//   const [toastMounted, setToastMounted] = useState(false);

//   // copy link
//   const copyToClipboard = async () => {
//     setIsCopyLoading(true);
//     setToastMounted(true);

//     try {
//       await navigator.clipboard.writeText(fullUrl);
//       setCopied(true);
//       toast.success("Link copied successfully", { position: "bottom-left" });
//       setTimeout(() => setCopied(false), 1500);
//     } catch {
//       toast.error("Failed to copy link", { position: "bottom-left" });
//     } finally {
//       setIsCopyLoading(false);
//     }
//   };

//   return (
//     <>
//       {toastMounted && <ToastContainer />}
//       <section className="pt-50 js-pin-container">
//         <div className="container">
//           <div className="row y-gap-30">
//             {children}
//             <div className="col-xl-4 d-flex justify-content-end align-items-end">
//               <div className="row ">
//                 {/* Share Dropdown */}
//                 <div className="col-auto btn-group dropup">
//                   <button
//                     type="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                     className="button px-10 py-10 -blue-1 "
//                   >
//                     <i className="icon-share mr-10"></i>
//                     Share
//                   </button>
//                   <ul className="dropdown-menu p-2">
//                     <li className="d-flex flex-wrap gap-2">
//                       <FacebookShareButton url={fullUrl}>
//                         <FacebookIcon size={32} round />
//                       </FacebookShareButton>
//                       <FacebookMessengerShareButton url={fullUrl}>
//                         <FacebookMessengerIcon size={32} round />
//                       </FacebookMessengerShareButton>
//                       <WhatsappShareButton url={fullUrl}>
//                         <WhatsappIcon size={32} round />
//                       </WhatsappShareButton>
//                       <EmailShareButton
//                         url={fullUrl}
//                         subject="Check out this amazing tour!"
//                         body="I found this great tour. Check it out here:"
//                       >
//                         <EmailIcon size={32} round />
//                       </EmailShareButton>

//                       {/* Copy Button */}
//                       <div
//                         onClick={copyToClipboard}
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           cursor: "pointer",
//                         }}
//                       >
//                         {isCopyLoading ? (
//                           <Loading />
//                         ) : (
//                           <Image
//                             src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/80bd75f3-6ddb-4c93-1acf-7b4fb358f200/public"
//                             alt="Copy link"
//                             width={40}
//                             height={40}
//                             style={{ objectFit: "contain" }}
//                           />
//                         )}
//                         {copied && (
//                           <span className="ml-2 text-success">Copied!</span>
//                         )}
//                       </div>
//                     </li>
//                   </ul>
//                 </div>

//                 {/* Save Button */}
//                 <div className="col-auto">
//                   <button className="button px-10 py-10 -blue-1 bg-light-2">
//                     <i className="icon-heart mr-10"></i>
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* End .row */}
//         </div>
//         {/* End .container */}
//       </section>
//     </>
//   );
// };

// export default SharePage;
