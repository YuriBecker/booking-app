import { z } from "zod";

export const searchFormSchema = z
  .object({
    city: z.string().optional(),
    checkIn: z.date(),
    checkOut: z.date(),
    numOfAdults: z.coerce.number(),
    numOfChildren: z.coerce.number(),
  })
  .superRefine(({ checkIn, checkOut }, ctx) => {
    if (checkIn && checkOut && checkIn > checkOut) {
      ctx.addIssue({
        code: "custom",
        message: "Check out must be after check in",
        path: ["checkOut"],
      });
    }
  })
  .superRefine(({ numOfChildren, numOfAdults }, ctx) => {
    if (numOfChildren && numOfAdults < 1) {
      ctx.addIssue({
        code: "custom",
        message: "Children must be accompanied by an adult",
        path: ["numOfAdults"],
      });
    }
  });
