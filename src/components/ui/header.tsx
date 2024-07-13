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
        "flex items-center h-[100px] bg-secondary sticky top-[-30px] z-50",
        isScrolled && "shadow-lg"
      )}
      ref={headerRef}
    >
      <div className="container mx-auto  h-[70px] sticky top-0 flex items-center justify-between gap-8">
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
