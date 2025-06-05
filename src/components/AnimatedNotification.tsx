"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedNotificationProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
}

export default function AnimatedNotification({
  children,
  isVisible,
  className = "",
}: AnimatedNotificationProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (isVisible) {
      // Show the element first
      setShouldRender(true);

      // Measure and animate in the next frame
      requestAnimationFrame(() => {
        if (contentRef.current) {
          const naturalHeight = contentRef.current.scrollHeight;
          setHeight(naturalHeight);
        }
      });
    } else {
      // Animate out
      setHeight(0);

      // Hide after animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender && !isVisible) {
    return null;
  }

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={{ height: `${height}px` }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
