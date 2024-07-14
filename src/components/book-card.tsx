import useBookingReservation from "@/hooks/useBookingReservation";
import { Booking } from "@/models/booking";
import { useGetPropertyQuery } from "@/services/api-service";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/tailwind";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDaysIcon, StarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { editBookingFormSchema } from "@/pages/Bookings/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DateField } from "./ui/date-input";
import { useState } from "react";

const DeleteBookingButton = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="lg" variant="destructive" className="w-full">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            booking reservation
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const EditBookingButton = ({
  onEdit,
  booking,
}: {
  onEdit: (updatedBooking: Booking) => void;
  booking: Booking;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof editBookingFormSchema>>({
    resolver: zodResolver(editBookingFormSchema),
    defaultValues: {
      checkIn: new Date(booking.checkIn),
      checkOut: new Date(booking.checkOut),
    },
  });

  function onSubmit(values: z.infer<typeof editBookingFormSchema>) {
    try {
      const updatedBooking: Booking = {
        ...booking,
        checkIn: values.checkIn.toISOString(),
        checkOut: values.checkOut.toISOString(),
      };

      onEdit(updatedBooking);

      toast.success("Booking reservation updated successfully");

      setIsOpen(false);
    } catch (e) {
      form.setError("checkIn", {
        type: "manual",
        message: "Property is already booked between these dates",
      });

      form.setError("checkOut", {
        type: "manual",
        message: "Property is already booked between these dates",
      });
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" className="w-full">
          Edit dates
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mx-auto w-full max-w-2xl">
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit booking reservation</DrawerTitle>
                <DrawerDescription>Booking ID {booking.id}</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 grid gap-4">
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check in</FormLabel>
                      <FormControl>
                        <DateField placeholder="Select a date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check out</FormLabel>
                      <FormControl>
                        <DateField placeholder="Select a date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter>
                <Button type="submit">Edit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

type Props = {
  booking: Booking;
};

const BookCard = ({ booking }: Props) => {
  const { data: property } = useGetPropertyQuery(booking.propertyId);
  const { handleEditBooking, handleRemoveBooking } = useBookingReservation();

  return (
    <Card className="w-full max-w-md overflow-hidden flex flex-col justify-between">
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
