import NoData from "@/components/ui/no-data";
import { DateInput } from "@/components/ui/date-input";
import useFavoriteHandlers from "@/hooks/useFavoriteHandlers";
import routerPaths from "@/router/paths";
import { addDays } from "@/utils/dates";
import type { OnSelectHandler } from "react-day-picker";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../Search/components/PropertyCard";
import useBookProperty from "../Search/hooks/useBookProperty";
import FavoritesBreadcrumb from "./components/Breadcrumb";
import { useTranslation } from "react-i18next";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { favorites } = useFavoriteHandlers();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 1));
  const { handleBookProperty } = useBookProperty({
    checkIn: checkInDate.toISOString(),
    checkOut: checkOutDate.toISOString(),
  });
  const showNoResults = favorites.length === 0;

  const handleCheckInChange: OnSelectHandler<Date | undefined> = (selectedDay) => {
    if (!selectedDay) {
      return;
    }

    setCheckInDate(selectedDay);

    if (selectedDay >= checkOutDate) {
      setCheckOutDate(addDays(selectedDay, 1));
    }
  };

  const handleCheckOutChange: OnSelectHandler<Date | undefined> = (selectedDay) => {
    if (!selectedDay) {
      return;
    }

    if (selectedDay <= checkInDate) {
      setCheckOutDate(addDays(checkInDate, 1));
      return;
    }

    setCheckOutDate(selectedDay);
  };

  if (showNoResults) {
    return (
      <NoData
        className="bg-background container"
        buttonLabel={t("favorites.findStay")}
        onClick={() => navigate(routerPaths.home)}
        description={t("favorites.noResults")}
      />
    );
  }

  return (
    <div
      className="container mx-auto px-8 mt-6 lg:mt-14 pb-8"
      data-cy="favorites-list"
    >
      <FavoritesBreadcrumb />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mb-8">
        <div>
          <p className="text-sm font-medium text-secondary mb-2">{t("home.checkIn")}</p>
          <DateInput
            value={checkInDate}
            onChange={handleCheckInChange}
            placeholder={t("home.selectCheckIn")}
            dataCy="favorites-check-in-date"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-secondary mb-2">{t("home.checkOut")}</p>
          <DateInput
            value={checkOutDate}
            onChange={handleCheckOutChange}
            placeholder={t("home.selectCheckOut")}
            dataCy="favorites-check-out-date"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            checkIn={checkInDate.toISOString()}
            checkOut={checkOutDate.toISOString()}
            handleBookProperty={handleBookProperty}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
