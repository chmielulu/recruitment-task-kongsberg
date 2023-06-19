import { useRef } from "react";

export const useScrollToHeadline = () => {
  const headline = useRef<HTMLHeadingElement>(null);

  return {
    ref: headline,
    scrollToHeadline: () => {
      if (window.innerWidth < 1280 && headline.current) {
        headline.current.scrollIntoView({ behavior: "smooth" });
      }
    },
  };
};
