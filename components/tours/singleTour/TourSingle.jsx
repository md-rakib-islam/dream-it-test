"use client";

import { memo, Suspense } from "react";
import dynamic from "next/dynamic";
import TourSinglePage from "./TourSinglePage";

// 🚀 OPTIMIZATION: Lazy load SharePage since it's not critical for LCP
const SharePage = dynamic(() => import("./SharePage"), {
  ssr: false,
  loading: () => (
    <div style={{ height: '60px', background: '#f8f9fa' }} className="d-flex align-items-center justify-content-center">
      <div style={{ width: '200px', height: '20px', background: '#e0e0e0', borderRadius: '4px' }}></div>
    </div>
  ),
});

// 🚀 OPTIMIZATION: Memoized component to prevent unnecessary re-renders
const TourSingle = memo(({ children, data, fullUrl, itenarayItems }) => {
  return (
    <>
      {/* 🚀 CRITICAL: Header margin for proper spacing */}
      <div className="header-margin"></div>
      
      {/* 🚀 OPTIMIZATION: Suspense boundary for SharePage */}
      <Suspense 
        fallback={
          <div style={{ height: '60px', background: '#f8f9fa' }} className="d-flex align-items-center justify-content-center">
            <div style={{ width: '200px', height: '20px', background: '#e0e0e0', borderRadius: '4px' }}></div>
          </div>
        }
      >
        <SharePage fullUrl={fullUrl}>
          {children}
        </SharePage>
      </Suspense>

      {/* 🚀 CRITICAL: Main tour content - highest priority */}
      <TourSinglePage tourData={data} itenarayItems={itenarayItems} />
    </>
  );
});

// Set display name for debugging
TourSingle.displayName = 'TourSingle';

export default TourSingle;
