import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-input";
import { Search } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import type {
  SearchFormInput,
  SearchFormValues,
} from "../../hooks/useSearchForm";
import { getCityOptions } from "../../constants/city-options";
import { useTranslation } from "react-i18next";

type Props = {
  form: UseFormReturn<SearchFormInput, unknown, SearchFormValues>;
  onSubmit: (values: SearchFormValues) => void;
};

const SearchForm = ({ form, onSubmit }: Props) => {
  const { t } = useTranslation();
  const cityOptions = getCityOptions(t);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-secondary-foreground">{t("home.city")}</FormLabel>
              <FormControl>
                <SelectField
                  placeholder={t("home.where")}
                  searchPlaceholder={t("home.searchCity")}
                  emptyMessage={t("home.noCity")}
                  options={cityOptions}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-secondary-foreground">
                {t("home.checkIn")}
              </FormLabel>
              <FormControl>
                <DateInput
                  placeholder={t("home.selectCheckIn")}
                  dataCy="check-in-date"
                  {...field}
                />
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
              <FormLabel className="text-secondary-foreground">
                {t("home.checkOut")}
              </FormLabel>
              <FormControl>
                <DateInput
                  placeholder={t("home.selectCheckOut")}
                  dataCy="check-out-date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="numOfAdults"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary-foreground">
                  {t("home.adults")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t("home.addAdults")}
                    {...field}
                    value={
                      typeof field.value === "string" ||
                      typeof field.value === "number"
                        ? field.value
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numOfChildren"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-secondary-foreground">
                  {t("home.children")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={t("home.addChildren")}
                    {...field}
                    value={
                      typeof field.value === "string" ||
                      typeof field.value === "number"
                        ? field.value
                        : ""
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          <Search className="mr-2" height={20} />
          <span className="text-lg">{t("common.search")}</span>
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
