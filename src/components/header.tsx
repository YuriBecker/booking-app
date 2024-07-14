import routerPaths from "@/router/paths";
import { cn } from "@/utils/tailwind";
import { House } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useBookingReservation from "@/hooks/useBookingReservation";

const Header = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  const { bookings } = useBookingReservation();

  const totalBookings = bookings.length;

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
      className={cn(
        "flex items-center h-[100px] bg-secondary sticky top-[-30px] z-50",
        isScrolled && "shadow-lg"
      )}
      ref={headerRef}
    >
      <div className="container mx-auto  h-[70px] sticky top-0 flex items-center justify-between gap-8">
        <Link to={routerPaths.home}>
          <img
            className={cn(
              "w-full h-10 md:h-14 transform transition-all duration-200 hover:scale-105"
            )}
            src="/logo.svg"
            alt="hostfully"
          />
        </Link>

        <div className="relative inline-flex">
          <Link to={routerPaths.myBookings}>
            <Button variant="default">
              <House className="mr-2" /> My Bookings
            </Button>
          </Link>

          {totalBookings > 0 && (
            <div className="absolute top-0 right-0 -mt-2 -mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-red-50">
              {totalBookings}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
