import routerPaths from "@/router/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";

export const searchFormSchema = z
  .object({
    city: z.string().optional(),
    checkIn: z.date({
      message: "Select a check in date",
    }),
    checkOut: z.date({
      message: "Select a check out date",
    }),
    numOfAdults: z.coerce.number().min(0),
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

export type SearchFormInput = z.input<typeof searchFormSchema>;
export type SearchFormValues = z.output<typeof searchFormSchema>;

const useSearchForm = () => {
  const navigate = useNavigate();

  const form = useForm<SearchFormInput, unknown, SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      numOfAdults: 1,
      numOfChildren: 0,
    },
  });

  function onSubmit(values: SearchFormValues) {
    navigate({
      pathname: routerPaths.search,
      search: createSearchParams({
        city: values.city || "",
        checkIn: values.checkIn?.toISOString() || "",
        checkOut: values.checkOut?.toISOString() || "",
        numOfAdults: values.numOfAdults?.toString() || "",
        numOfChildren: values.numOfChildren?.toString() || "",
      }).toString(),
    });
  }

  return {
    form,
    onSubmit,
  };
};

export default useSearchForm;
