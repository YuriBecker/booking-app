import { Booking } from "@/models/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const editBookingFormSchema = z
  .object({
    checkIn: z.date(),
    checkOut: z.date(),
  })
  .superRefine(({ checkIn, checkOut }, ctx) => {
    if (checkIn && checkOut && checkIn >= checkOut) {
      ctx.addIssue({
        code: "custom",
        message: "Check out must be after check in",
        path: ["checkOut"],
      });
    }
  });

type Props = {
  onEdit: (updatedBooking: Booking) => void;
  booking: Booking;
  setIsOpen: (isOpen: boolean) => void;
};

const useEditForm = ({ booking, onEdit, setIsOpen }: Props) => {
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

  return {
    form,
    onSubmit,
  };
};

export default useEditForm;
