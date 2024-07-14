import { Property } from "@/models/property";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { BathIcon, BedDoubleIcon, BedIcon, StarIcon } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { cn } from "@/utils/tailwind";
import BookDrawer from "./book-drawer";
import { useNavigate, useSearchParams } from "react-router-dom";
import useBookingReservation from "@/hooks/useBookingReservation";
import { toast } from "sonner";
import routerPaths from "@/router/paths";

type Props = {
  property: Property;
};

const PropertyCard = ({ property }: Props) => {
  const [searchParams] = useSearchParams();
  const { handleAddBooking } = useBookingReservation();
  const navigate = useNavigate();

  // const city = searchParams.get("city") || "all";
  const checkIn = searchParams.get("checkIn") || new Date().toISOString();
  const checkOut = searchParams.get("checkOut") || new Date().toISOString();
  // const numOfAdults = Number(searchParams.get("numOfAdults"));
  // const numOfChildren = Number(searchParams.get("numOfChildren"));

  const handleBookClick = (id: Property["id"]) => {
    try {
      const price = Number(
        property.price.hasPromotion
          ? property.price.promotionalPricePerNight
          : property.price.perNight
      );

      handleAddBooking(id, checkIn, checkOut, price);

      toast.success("Property booked successfully");

      navigate(routerPaths.myBookings);
    } catch (error) {
      const message =
        (error as Error).message ||
        "An error occurred while booking the property";

      toast.error(message);
    }
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden mx-auto flex flex-col justify-between">
      <CardHeader className="p-0">
        <img
          className="object-cover w-full transform duration-200 hover:scale-105 rounded-t-lg aspect-[3/2] transition-all"
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          width={424}
          height={424}
        />
      </CardHeader>
      <CardContent className="p-6 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{property.title}</h3>
            <p className="text-sm text-muted-foreground">
              {property.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center">
          <div className="text-left">
            <div className="flex items-center gap-1 text-sm font-medium">
              <StarIcon
                className={cn(
                  "w-4 h-4 stroke-1",
                  property.reviews.reviewsCount && "fill-yellow-300"
                )}
              />
              <span className="ml-1">{property.reviews.totalScore}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {property.reviews.reviewsCount} reviews
            </p>
          </div>

          <div className="text-right">
            <div
              className={cn(
                "text-2xl font-bold text-secondary",
                property.price.hasPromotion &&
                  "line-through text-gray-500 text-md"
              )}
            >
              {formatCurrency(property.price.perNight)}
            </div>
            {property.price.hasPromotion &&
              property.price.promotionalPricePerNight && (
                <div className="text-xl font-bold text-secondary">
                  {formatCurrency(property.price.promotionalPricePerNight)}
                </div>
              )}
          </div>
        </div>

        <div className="flex items-left gap-4 text-sm text-muted-foreground flex-col md:items-center md:flex-row">
          <div className="flex items-center gap-2">
            <BedIcon className="w-5 h-5" />
            <span>{property.numberOfBedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <BedDoubleIcon className="w-5 h-5" />
            <span>{property.numberOfBedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <BathIcon className="w-5 h-5" />
            <span>{property.numberOfBathrooms} Bathroom</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <BookDrawer
          property={property}
          checkInDate={checkIn}
          checkOutDate={checkOut}
          handleBookProperty={() => handleBookClick(property.id)}
        />
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
