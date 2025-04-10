import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current device is a mobile device
 * @param breakpoint - The maximum width in pixels to consider as a mobile device (default: 768px)
 * @returns boolean - True if the current device is a mobile device
 */
export function useMobile(breakpoint = 768) {
  // Initialize with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // Function to check if the window width is less than the breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on initial render
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [breakpoint]);

  // Return false during SSR to avoid hydration mismatch
  // Once client-side code runs, it will update with the correct value
  return isMobile ?? false;
}
