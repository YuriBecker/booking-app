import { Booking } from "@/models/booking";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslation } from "react-i18next";

export const createEditBookingFormSchema = (t: (key: string) => string) => z
  .object({
    checkIn: z.date(),
    checkOut: z.date(),
  })
  .superRefine(({ checkIn, checkOut }, ctx) => {
    if (checkIn && checkOut && checkIn >= checkOut) {
      ctx.addIssue({
        code: "custom",
        message: t("validation.checkoutAfterCheckin"),
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
  const { t } = useTranslation();
  const form = useForm<z.infer<ReturnType<typeof createEditBookingFormSchema>>>({
    resolver: zodResolver(createEditBookingFormSchema(t)),
    defaultValues: {
      checkIn: new Date(booking.checkIn),
      checkOut: new Date(booking.checkOut),
    },
  });

  function onSubmit(values: z.infer<ReturnType<typeof createEditBookingFormSchema>>) {
    try {
      const updatedBooking: Booking = {
        ...booking,
        checkIn: values.checkIn.toISOString(),
        checkOut: values.checkOut.toISOString(),
      };

      onEdit(updatedBooking);

      toast.success(t("toast.bookingUpdated"));

      setIsOpen(false);
    } catch {
      form.setError("checkIn", {
        type: "manual",
        message: t("validation.propertyAlreadyBooked"),
      });

      form.setError("checkOut", {
        type: "manual",
        message: t("validation.propertyAlreadyBooked"),
      });
    }
  }

  return {
    form,
    onSubmit,
  };
};

export default useEditForm;
