"use client";
import "../wm-react/package/dist/css/wiener-melange.bundle.min.css";
import "../wm-react/package/dist/css/assets.css";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

/* 
    This component provides the required live region for the Wiener Melange
    anchor element (wm-anchor). The wm-anchor web component will throw an
    error if a live region with role="status" is not present in the DOM.
    This is enforced in the Anchor.js source, which checks for this element
    on mount. The live region is also used for accessibility, allowing screen
    readers to announce status messages (e.g., when a link is copied).
*/
const WMAnchorRequirement = () => (
  <div
    role="status"
    aria-live="polite"
    className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
  />
);

export default function WienerMelangeProvider({ children }: Props) {
  useEffect(() => {
    import("../wm-react/package/dist/js/bundle.min.js");
  }, []);
  return (
    <>
      <WMAnchorRequirement />
      {children}
    </>
  );
}
