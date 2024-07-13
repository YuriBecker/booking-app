import routerPaths from "@/router/paths";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { House } from "lucide-react";

const Header = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={clsx(
        "transform transition-all duration-500 sticky top-0 z-50 bg-secondary",
        isScrolled ? "py-8 md:py-8 shadow-md" : "py-12 md:py-14"
      )}
      ref={headerRef}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href={routerPaths.home}>
          <img
            className={clsx(
              "w-full h-10 md:h-14 transform transition-all duration-200 hover:scale-105",
              isScrolled ? "h-10" : "h-12"
            )}
            src="/logo.svg"
            alt="hostfully"
          />
        </a>

        <div className="flex items-center">
          <Button variant="default">
            <House className="mr-2" /> My Bookings
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
