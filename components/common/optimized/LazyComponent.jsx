"use client";

import { useState, useEffect, useRef } from "react";

const LazyComponent = ({
  children,
  fallback = null,
  rootMargin = "100px",
  threshold = 0.1,
  className = "",
  style = {},
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasLoaded(true);

            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [rootMargin, threshold, once]);

  return (
    <div ref={elementRef} className={className} style={style}>
      {isVisible || hasLoaded ? children : fallback}
    </div>
  );
};

// Higher-order component for lazy loading
export const withLazyLoading = (Component, options = {}) => {
  return function LazyLoadedComponent(props) {
    return (
      <LazyComponent {...options}>
        <Component {...props} />
      </LazyComponent>
    );
  };
};

export default LazyComponent;
