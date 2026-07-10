import useBookingHandlers from "@/hooks/useBookingHandlers";
import { Booking } from "@/models/booking";
import { Property } from "@/models/property";
import routerPaths from "@/router/paths";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { isBookingAvailabilityConflict } from "@/utils/booking-errors";

type Props = {
  checkIn: Booking["checkIn"];
  checkOut: Booking["checkOut"];
};

const useBookProperty = ({ checkIn, checkOut }: Props) => {
  const { handleAddBooking } = useBookingHandlers();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBookProperty = (property: Property) => {
    try {
      const price = Number(
        property.price.hasPromotion
          ? property.price.promotionalPricePerNight
          : property.price.perNight
      );

      handleAddBooking({
        propertyId: property.id,
        checkIn,
        checkOut,
        price,
      });

      toast.success(t("toast.booked"));

      navigate(routerPaths.myBookings);
    } catch (error) {
      const message = isBookingAvailabilityConflict(error)
        ? t("validation.propertyAlreadyBooked")
        : error instanceof Error && error.message
          ? error.message
          : t("toast.bookingError");

      toast.error(message);
    }
  };

  return {
    handleBookProperty,
  };
};

export default useBookProperty;
