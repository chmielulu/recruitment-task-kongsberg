import { useRef } from "react";

export const useScrollToHeadline = () => {
  const headline = useRef<HTMLHeadingElement>(null);

  return {
    ref: headline,
    handleAnimationComplete: () => {
      if (window.innerWidth < 1280 && headline.current) {
        headline.current.scrollIntoView({ behavior: "smooth" });
      }
    },
  };
};
