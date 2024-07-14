import { useEffect, useRef, useState } from "react";

const useScrollTracking = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isScrolled,
    headerRef,
  };
};

export default useScrollTracking;
