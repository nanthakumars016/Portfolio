import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * Scrolls the page back to the top on every route change.
 * Works with Lenis smooth scroll by targeting the document element directly
 * before Lenis can intercept, and also calls window.scrollTo as fallback.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small timeout lets the new page mount first, then snap to top
    const id = setTimeout(() => {
      // Try Lenis-compatible scroll first (targets the root scroller)
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 10);

    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
