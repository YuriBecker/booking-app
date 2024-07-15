import useBookingHandlers from "@/hooks/useBookingHandlers";
import { Booking } from "@/models/booking";
import { Property } from "@/models/property";
import routerPaths from "@/router/paths";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
  checkIn: Booking["checkIn"];
  checkOut: Booking["checkOut"];
};

const useBookProperty = ({ checkIn, checkOut }: Props) => {
  const { handleAddBooking } = useBookingHandlers();
  const navigate = useNavigate();

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

      toast.success("Property booked successfully");

      navigate(routerPaths.myBookings);
    } catch (error) {
      const message =
        (error as Error).message ||
        "An error occurred while booking the property";

      toast.error(message);
    }
  };

  return {
    handleBookProperty,
  };
};

export default useBookProperty;
