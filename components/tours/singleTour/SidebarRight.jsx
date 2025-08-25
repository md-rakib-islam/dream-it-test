// "use client";

// import { useEffect, useState, useRef, useMemo, useCallback } from "react";
// import Image from "next/image";
// import dynamic from "next/dynamic";
// import { tour_content_id } from "@/constant/constants";
// import thirdPartyManager, {
//   THIRD_PARTY_CONFIGS,
// } from "@/utils/thirdPartyManager";

// // 🚀 CRITICAL: Lazy load calendar component - not needed for initial LCP
// const AgentCalendar = dynamic(() => import("./Bookings/AgentCalendar"), {
//   ssr: false,
//   loading: () => (
//     <div
//       className="bg-gray-100 animate-pulse rounded-lg p-6"
//       style={{ minHeight: "400px" }}
//     >
//       <div className="h-4 bg-gray-200 rounded mb-4"></div>
//       <div className="h-32 bg-gray-200 rounded mb-4"></div>
//       <div className="h-10 bg-gray-200 rounded"></div>
//     </div>
//   ),
// });

// const SidebarRight = ({ data }) => {
//   // 🚀 OPTIMIZATION: Optimize state management
//   const [busdata, setBusdata] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [bokunLoaded, setBokunLoaded] = useState(false);
//   const [bokunError, setBokunError] = useState(null);
//   const [retryCount, setRetryCount] = useState(0);

//   // Use refs for cleanup and preventing duplicate fetches
//   const isMountedRef = useRef(true);
//   const fetchControllerRef = useRef(null);
//   const dataFetchedRef = useRef(false);

//   // 🚀 OPTIMIZATION: Memoize data dependency
//   const dataDependency = useMemo(() => data?.select_bus, [data?.select_bus]);

//   // 🚀 OPTIMIZATION: Memoized fetch function
//   const fetchBusData = useCallback(async (selectBus) => {
//     // Cancel previous request
//     if (fetchControllerRef.current) {
//       fetchControllerRef.current.abort();
//     }

//     const controller = new AbortController();
//     fetchControllerRef.current = controller;

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${tour_content_id}${selectBus}`, {
//         signal: controller.signal,
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch bus data: ${response.status} ${response.statusText}`
//         );
//       }

//       const busData = await response.json();

//       // Only update state if component is still mounted and request wasn't aborted
//       if (isMountedRef.current && !controller.signal.aborted) {
//         setBusdata(busData);
//         dataFetchedRef.current = true;
//       }
//     } catch (error) {
//       if (error.name === "AbortError") {
//         console.log("Bus data fetch was aborted");
//         return;
//       }

//       console.error("Error fetching bus data:", error);
//       if (isMountedRef.current) {
//         setError(error.message);
//         setBusdata([]);
//       }
//     } finally {
//       if (isMountedRef.current && !controller.signal.aborted) {
//         setLoading(false);
//       }
//     }
//   }, []);

//   // 🚀 OPTIMIZATION: Effect for bus data fetching with debouncing
//   useEffect(() => {
//     // Skip if no dependency or already fetched
//     if (!dataDependency || dataFetchedRef.current) {
//       return;
//     }

//     // Debounce the fetch to prevent rapid calls
//     const timeoutId = setTimeout(() => {
//       fetchBusData(dataDependency);
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [dataDependency, fetchBusData]);

//   // 🚀 OPTIMIZATION: Use ThirdPartyManager for better performance and reliability
//   useEffect(() => {
//     if (data?.is_bokun_url !== true) {
//       console.log("Not a Bokun URL, skipping script load");
//       return;
//     }

//     if (!data?.url) {
//       console.error("Bokun URL is missing");
//       setBokunError("Booking URL is missing");
//       return;
//     }

//     console.log("Loading Bokun widget for URL:", data.url);

//     // Use ThirdPartyManager for optimized loading
//     const loadBokunScript = async () => {
//       try {
//         // Configure Bokun script with intersection loading for better performance
//         const bokunConfig = {
//           ...THIRD_PARTY_CONFIGS.bokun,
//           src: 'https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c8f2314b-0289-4a75-825c-37cb690a7c70',
//           loadStrategy: 'intersection',
//           container: document.querySelector('.bokunWidget') || document.body,
//           onLoad: () => {
//             console.log('✅ Bokun script loaded via ThirdPartyManager');
//             setBokunLoaded(true);
//             setBokunError(null);

//             // Initialize widget with retry logic
//             let attempts = 0;
//             const maxAttempts = 5;

//             const tryInitialize = () => {
//               attempts++;
//               if (window.BokunWidgets) {
//                 try {
//                   window.BokunWidgets.init();
//                   console.log('✅ Bokun widget initialized successfully');
//                 } catch (initError) {
//                   console.error('Bokun initialization error:', initError);
//                   if (attempts < maxAttempts) {
//                     setTimeout(tryInitialize, 1000);
//                   } else {
//                     setBokunError('Widget initialization failed after multiple attempts');
//                   }
//                 }
//               } else if (attempts < maxAttempts) {
//                 console.log(`Attempt ${attempts}: BokunWidgets not ready, retrying...`);
//                 setTimeout(tryInitialize, 1000);
//               } else {
//                 console.error('BokunWidgets not available after multiple attempts');
//                 setBokunError('Booking system not available. Please try refreshing.');
//               }
//             };

//             setTimeout(tryInitialize, 500);
//           },
//           onError: (error) => {
//             console.error('❌ Bokun script failed to load via ThirdPartyManager:', error);
//             setBokunError('Failed to load booking system. Please check your internet connection and try again.');
//           }
//         };

//         // Check if already loaded
//         if (thirdPartyManager.isLoaded('bokun-widget')) {
//           console.log("Bokun script already loaded via ThirdPartyManager");
//           setBokunLoaded(true);

//           // Try to initialize if available
//           setTimeout(() => {
//             if (window.BokunWidgets) {
//               try {
//                 window.BokunWidgets.init();
//                 console.log("Bokun widget re-initialized");
//               } catch (error) {
//                 console.error("Bokun re-initialization failed:", error);
//               }
//             }
//           }, 100);
//           return;
//         }

//         await thirdPartyManager.loadScript(bokunConfig);
//       } catch (error) {
//         console.error('ThirdPartyManager Bokun loading failed:', error);
//         setBokunError('Booking system loading failed. Please try refreshing the page.');
//       }
//     };

//     loadBokunScript();
//   }, [data?.is_bokun_url, data?.url]);

//   // 🚀 OPTIMIZATION: Cleanup effect
//   useEffect(() => {
//     isMountedRef.current = true;

//     return () => {
//       isMountedRef.current = false;
//       // Cancel any ongoing fetch
//       if (fetchControllerRef.current) {
//         fetchControllerRef.current.abort();
//       }
//     };
//   }, []);

//   // 🚀 OPTIMIZATION: Memoize calendar component
//   const agentCalendarComponent = useMemo(() => {
//     if (loading || error || data?.is_bokun_url !== false) {
//       return null;
//     }

//     return <AgentCalendar tourdata={data} busdata={busdata} />;
//   }, [data, busdata, loading, error]);

//   // 🚀 OPTIMIZATION: Memoize Bokun widget
//   const bokunWidgetComponent = useMemo(() => {
//     if (data?.is_bokun_url !== true) {
//       return null;
//     }

//     if (bokunError) {
//       return (
//         <div className="text-center py-4" style={{ minHeight: "400px" }}>
//           <div className="text-danger mb-3">
//             <p>{bokunError}</p>
//             <small className="text-muted">Retry attempt: {retryCount}</small>
//           </div>

//           <div className="mb-3">
//             <button
//               onClick={() => {
//                 setBokunError(null);
//                 setBokunLoaded(false);
//                 setRetryCount(prev => prev + 1);

//                 // Remove existing script
//                 const existingScript = document.querySelector('script[src*="BokunWidgetsLoader.js"]');
//                 if (existingScript) {
//                   existingScript.remove();
//                 }

//                 // Force re-render to trigger useEffect
//                 setTimeout(() => {
//                   console.log('Retrying Bokun widget load...');
//                 }, 100);
//               }}
//               className="btn btn-sm btn-outline-primary me-2"
//             >
//               Retry Booking System
//             </button>

//             <div className="d-flex gap-2">
//               {data?.url && (
//                 <a
//                   href={data.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn btn-sm btn-primary"
//                 >
//                   Book Directly
//                 </a>
//               )}

//               <button
//                 onClick={() => {
//                   // Try iframe fallback
//                   setBokunError(null);
//                   setBokunLoaded(true);
//                   console.log('Switching to iframe fallback mode');
//                 }}
//                 className="btn btn-sm btn-outline-secondary"
//               >
//                 Try Iframe
//               </button>
//             </div>
//           </div>

//           <div className="text-muted small">
//             <p>If the booking system continues to have issues:</p>
//             <ul className="text-start" style={{ display: 'inline-block' }}>
//               <li>Check your internet connection</li>
//               <li>Disable ad blockers temporarily</li>
//               <li>Try refreshing the page</li>
//               <li>Use the "Book Directly" button above</li>
//             </ul>
//           </div>
//         </div>
//       );
//     }

//     if (!bokunLoaded) {
//       return (
//         <div className="text-center py-4" style={{ minHeight: "400px" }}>
//           <div className="spinner-border text-primary mb-3" role="status">
//             <span className="visually-hidden">Loading booking system...</span>
//           </div>
//           <p>Loading booking system...</p>
//         </div>
//       );
//     }

//     console.log("Rendering Bokun widget with URL:", data?.url);

//     // If retryCount > 3, use iframe fallback
//     if (retryCount > 3) {
//       console.log('Using iframe fallback due to multiple failures');
//       return (
//         <div style={{ minHeight: "400px" }}>
//           <div className="mb-3 text-center">
//             <small className="text-muted">Using fallback booking method</small>
//           </div>
//           <iframe
//             src={data?.url}
//             style={{
//               width: '100%',
//               height: '500px',
//               border: '1px solid #ddd',
//               borderRadius: '8px'
//             }}
//             title="Booking System"
//             loading="lazy"
//           />
//         </div>
//       );
//     }

//     return (
//       <div
//         className="bokunWidget"
//         data-src={data?.url}
//         style={{ minHeight: "400px" }} // Prevent layout shift
//         key={data?.url} // Force re-render if URL changes
//       >
//         {/* Fallback content if widget doesn't load */}
//         <div className="text-center py-4">
//           <p>If booking form doesn't appear, please <a href={data?.url} target="_blank" rel="noopener noreferrer">click here to book directly</a>.</p>
//         </div>
//       </div>
//     );
//   }, [data?.is_bokun_url, data?.url, bokunLoaded, bokunError]);

//   // 🚀 OPTIMIZATION: Memoize Klarna payment info
//   const klarnaSection = useMemo(
//     () => (
//       <div className="d-flex items-center gradient-text" role="banner">
//         <div
//           style={{ width: "50px", height: "22px", position: "relative" }}
//           aria-label="Klarna Payment System"
//         >
//           <Image
//             src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/863921a6-6870-4690-d6bd-8dd0f0314f00/public"
//             alt="Klarna Payment System"
//             fill
//             sizes="50px"
//             style={{ objectFit: "contain" }}
//             loading="lazy" // Not LCP, can be lazy
//             quality={75}
//           />
//         </div>
//         <span className="fw-500 ml-20">Book now, pay in 3 installments</span>
//       </div>
//     ),
//     []
//   );

//   // Debug logging
//   useEffect(() => {
//     console.log("=== SidebarRight Debug Info ===");
//     console.log("is_bokun_url:", data?.is_bokun_url);
//     console.log("url:", data?.url);
//     console.log("bokunLoaded:", bokunLoaded);
//     console.log("bokunError:", bokunError);
//     console.log("error:", error);
//     console.log("loading:", loading);
//     console.log("retryCount:", retryCount);
//     console.log("BokunWidgets available:", typeof window !== 'undefined' ? !!window.BokunWidgets : 'SSR');
//     console.log("Existing Bokun script:", !!document.querySelector('script[src*="BokunWidgetsLoader.js"]'));
//     console.log("================================");
//   });

//   return (
//     <aside className="d-flex" style={{ height: "fit-content" }}>
//       <div
//         className="w-360 lg:w-full d-flex flex-column"
//         style={{ minHeight: "500px" }} // 🚀 CRITICAL: Reserve space to prevent CLS
//       >
//         {klarnaSection}

//         {/* Loading state */}
//         {loading && (
//           <div className="text-center py-4" aria-live="polite">
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading bus data...</span>
//             </div>
//           </div>
//         )}

//         {/* Error state - only for bus data, not Bokun */}
//         {error && data?.is_bokun_url === false && (
//           <div className="text-center py-4 text-danger" role="alert">
//             <p>Unable to load booking information</p>
//             <button
//               onClick={() => fetchBusData(dataDependency)}
//               className="btn btn-sm btn-outline-primary mt-2"
//               disabled={loading}
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {/* Main content */}
//         {data?.is_bokun_url === false ? (
//           // Agent Calendar (only show if no loading/error)
//           !loading && !error && (
//             <div style={{ minHeight: "400px" }}>
//               {agentCalendarComponent}
//             </div>
//           )
//         ) : (
//           // Bokun Widget (always show, has its own loading/error states)
//           <div style={{ minHeight: "400px" }}>
//             {bokunWidgetComponent}
//           </div>
//         )}
//       </div>

//       {/* 🚀 OPTIMIZATION: Critical CSS only */}
//       <style jsx>{`
//         .spinner-border {
//           display: inline-block;
//           width: 1.5rem;
//           height: 1.5rem;
//           vertical-align: text-bottom;
//           border: 0.125em solid currentColor;
//           border-right-color: transparent;
//           border-radius: 50%;
//           animation: spinner-border 0.75s linear infinite;
//         }

//         @keyframes spinner-border {
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         .visually-hidden {
//           position: absolute !important;
//           width: 1px !important;
//           height: 1px !important;
//           padding: 0 !important;
//           margin: -1px !important;
//           overflow: hidden !important;
//           clip: rect(0, 0, 0, 0) !important;
//           white-space: nowrap !important;
//           border: 0 !important;
//         }

//         .gradient-text {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//       `}</style>
//     </aside>
//   );
// };

// export default SidebarRight;

"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import AgentCalendar from "./Bookings/AgentCalendar";
import { tour_content_id } from "@/constant/constants";

const SidebarRight = ({ data }) => {
  // State for bus data
  const [busdata, setBusdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use ref to track if component is mounted
  const isMounted = useRef(true);

  // Use ref to prevent multiple data fetches
  const dataFetchedRef = useRef(false);

  // Memoize the data dependency to prevent unnecessary effect triggers
  const dataDependency = useMemo(() => {
    return data?.select_bus;
  }, [data?.select_bus]);

  useEffect(() => {
    // Set mounted flag
    isMounted.current = true;

    // Cleanup function to set mounted flag to false when unmounting
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Skip if data or select_bus is missing
    if (!data || !dataDependency) {
      console.warn("Missing data or select_bus for fetching bus data");
      return;
    }

    // Skip if we've already fetched this data
    if (dataFetchedRef.current) {
      return;
    }

    const fetchBusData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${tour_content_id}${dataDependency}`);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const busData = await response.json();

        // Only update state if component is still mounted
        if (isMounted.current) {
          setBusdata(busData);
          setError(null);
          // Mark data as fetched
          dataFetchedRef.current = true;
        }
      } catch (error) {
        console.error("Error fetching bus data:", error);
        if (isMounted.current) {
          setError(error.message);
          setBusdata([]);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchBusData();
  }, [dataDependency]); // Only depend on memoized dataDependency

  useEffect(() => {
    if (data?.is_bokun_url !== true) return;

    const existingScript = document.querySelector(
      'script[src*="BokunWidgetsLoader.js"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.src =
      "https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=c8f2314b-0289-4a75-825c-37cb690a7c70";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(
        'script[src*="BokunWidgetsLoader.js"]'
      );
      if (scriptToRemove?.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [data?.is_bokun_url]);

  // Memoize the AgentCalendar component to prevent unnecessary re-renders
  const agentCalendarComponent = useMemo(() => {
    if (loading || error || data?.is_bokun_url !== false) {
      return null;
    }

    return <AgentCalendar tourdata={data} busdata={busdata} />;
  }, [data, busdata, loading, error]);

  // Memoize the Bokun widget component
  const bokunWidgetComponent = useMemo(() => {
    if (data?.is_bokun_url !== true) {
      return null;
    }

    return <div className="bokunWidget" data-src={data?.url}></div>;
  }, [data?.is_bokun_url, data?.url]);

  return (
    <div className="d-flex" style={{ height: "fit-content" }}>
      <div
        className="w-360 lg:w-full d-flex flex-column"
        style={{ minHeight: "500px" }} // 👈 reserve space
      >
        <div className="d-flex items-center gradient-text">
          <div style={{ width: "50px", height: "22px", position: "relative" }}>
            <Image
              src="https://imagedelivery.net/dIKhvGtesTiRSxhQ2oKWkA/863921a6-6870-4690-d6bd-8dd0f0314f00/public"
              alt="Klarna Payment System"
              fill
              sizes="50px"
              style={{ objectFit: "contain" }}
            />
          </div>
          <span className="fw-500 ml-20">Book now, pay in 3 installments</span>
        </div>
        {loading && <div className="text-center py-4">Loading bus data...</div>}
        {error && (
          <div className="text-center py-4 text-red-500">
            Error loading bus data: {error}
          </div>
        )}
        {!loading && !error && (
          <>
            {data?.is_bokun_url === false
              ? agentCalendarComponent
              : bokunWidgetComponent}
          </>
        )}
      </div>
    </div>
  );
};

// Export with React.memo to prevent unnecessary re-renders
export default SidebarRight;
