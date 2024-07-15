import useBookingHandlers from "@/hooks/useBookingHandlers";
import { Booking } from "@/models/booking";
import { useGetPropertyQuery } from "@/services/api-service";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/tailwind";
import { CalendarDaysIcon, StarIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import EditBookingButton from "../EditBookingButton";
import DeleteBookingButton from "../DeleteBookingButton";

type Props = {
  booking: Booking;
};

const BookCard = ({ booking }: Props) => {
  const { data: property } = useGetPropertyQuery(booking.propertyId);
  const { handleEditBooking, handleRemoveBooking } = useBookingHandlers();

  return (
    <Card
      className="w-full max-w-md overflow-hidden flex flex-col justify-between"
      data-cy="booking-card"
    >
      <CardHeader className="p-0">
        <img
          className="object-cover w-full transform duration-200 hover:scale-105 rounded-t-lg aspect-[3/2] transition-all"
          src={property?.images[0]}
          alt={property?.title}
          loading="lazy"
          width={424}
          height={424}
        />
      </CardHeader>

      <CardContent className="p-6 flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-md font-semibold">{property?.title}</h3>
            <p className="text-sm text-muted-foreground">
              Booking ID: {booking.id}
            </p>
            <p className="text-sm text-muted-foreground">
              Updated At{" "}
              {formatDate(booking.updatedAt, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center">
          <div className="text-left">
            <div className="flex items-center gap-1 text-sm font-medium">
              <StarIcon
                className={cn(
                  "w-4 h-4 stroke-1",
                  property?.reviews.reviewsCount && "fill-yellow-300"
                )}
              />
              <span className="ml-1">{property?.reviews.totalScore}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {property?.reviews.reviewsCount} reviews
            </p>
          </div>

          <div className="text-right">
            <div className={cn("text-2xl font-bold text-secondary")}>
              {formatCurrency(booking.price)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-bold">
              Check-in: {formatDate(booking.checkIn)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4 text-muted-foreground " />
            <span className="text-sm text-muted-foreground font-bold">
              Check-out: {formatDate(booking.checkOut)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex flex-col gap-2 w-full">
          <EditBookingButton onEdit={handleEditBooking} booking={booking} />
          <DeleteBookingButton
            onDelete={() => handleRemoveBooking(booking.id)}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
