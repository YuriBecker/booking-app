import routerPaths from "@/router/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useTranslation } from "react-i18next";

export const createSearchFormSchema = (t: (key: string) => string) => z
  .object({
    city: z.string().optional(),
    checkIn: z.date({
      message: t("validation.selectCheckIn"),
    }),
    checkOut: z.date({
      message: t("validation.selectCheckOut"),
    }),
    numOfAdults: z.coerce.number().min(0),
    numOfChildren: z.coerce.number(),
  })
  .superRefine(({ checkIn, checkOut }, ctx) => {
    if (checkIn && checkOut && checkIn > checkOut) {
      ctx.addIssue({
        code: "custom",
        message: t("validation.checkoutAfterCheckin"),
        path: ["checkOut"],
      });
    }
  })
  .superRefine(({ numOfChildren, numOfAdults }, ctx) => {
    if (numOfChildren && numOfAdults < 1) {
      ctx.addIssue({
        code: "custom",
        message: t("validation.childrenNeedAdult"),
        path: ["numOfAdults"],
      });
    }
  });

export type SearchFormInput = z.input<ReturnType<typeof createSearchFormSchema>>;
export type SearchFormValues = z.output<ReturnType<typeof createSearchFormSchema>>;

const useSearchForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<SearchFormInput, unknown, SearchFormValues>({
    resolver: zodResolver(createSearchFormSchema(t)),
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
