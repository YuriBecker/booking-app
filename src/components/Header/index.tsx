import routerPaths from "@/router/paths";
import { cn } from "@/utils/tailwind";
import { Globe2, Heart, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useBookingHandlers from "@/hooks/useBookingHandlers";
import useFavoriteHandlers from "@/hooks/useFavoriteHandlers";
import useScrollTracking from "./hooks/useScrollTracking";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { localeMetadata, setLocale, supportedLocales, type SupportedLocale } from "@/i18n";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { bookings } = useBookingHandlers();
  const { favorites } = useFavoriteHandlers();
  const { headerRef, isScrolled } = useScrollTracking();
  const { t, i18n } = useTranslation();
  const activeLocale: SupportedLocale = i18n.resolvedLanguage === "pt-BR" ? "pt-BR" : "en";

  const totalBookings = bookings.length;
  const totalFavorites = favorites.length;

  return (
    <header
      className={cn(
        "flex items-center h-[124px] bg-secondary sticky top-[-30px] z-50 sm:h-[100px]",
        isScrolled && "shadow-lg"
      )}
      ref={headerRef}
    >
      <div className="container mx-auto h-[94px] sticky top-0 flex flex-col items-center justify-center gap-3 px-8 sm:h-[70px] sm:flex-row sm:justify-between sm:gap-8">
        <Link to={routerPaths.home} className="shrink-0">
          <img
            className={cn(
              "h-9 w-auto md:h-14 transform transition-all duration-200 hover:scale-105"
            )}
            src="/logo.svg"
            alt="hostfully"
          />
        </Link>

        <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-end">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-3"
                aria-label={t("header.changeLanguage")}
                data-cy="language-switcher"
              >
                <Globe2 className="mr-2 h-4 w-4" aria-hidden="true" />
                {activeLocale === "en" ? "EN" : "PT"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-2" align="end">
              <p className="px-2 py-1 text-sm font-medium">{t("header.language")}</p>
              <div role="menu" className="flex flex-col gap-1">
                {supportedLocales.map((locale) => (
                  <Button
                    key={locale}
                    type="button"
                    role="menuitemradio"
                    tabIndex={0}
                    aria-checked={activeLocale === locale}
                    variant={activeLocale === locale ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => void setLocale(locale)}
                    data-cy={`language-option-${locale}`}
                  >
                    {localeMetadata[locale].label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="relative inline-flex">
            <Link to={routerPaths.favorites} data-cy="header-favorites-link">
              <Button variant="default" size="sm" className="px-3">
                <Heart className="mr-2 h-4 w-4" /> {t("header.favorites")}
              </Button>
            </Link>

            {totalFavorites > 0 && (
              <div
                className="absolute top-0 right-0 -mt-2 -mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-red-50"
                data-cy="favorites-count-badge"
              >
                {totalFavorites}
              </div>
            )}
          </div>

          <div className="relative inline-flex">
            <Link to={routerPaths.myBookings}>
              <Button variant="default" size="sm" className="px-3">
                <House className="mr-2 h-4 w-4" /> {t("header.myBookings")}
              </Button>
            </Link>

            {totalBookings > 0 && (
              <div className="absolute top-0 right-0 -mt-2 -mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-red-50">
                {totalBookings}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
