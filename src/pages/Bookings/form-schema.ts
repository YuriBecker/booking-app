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
