import { Button } from "@/components/ui/button";
import { DateField } from "@/components/ui/date-input";
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
import { z } from "zod";
import { searchFormSchema } from "../../hooks/useSearchForm";
import { selectCityOptions } from "../../constants/city-options";

type Props = {
  form: UseFormReturn<z.infer<typeof searchFormSchema>>;
  onSubmit: (values: z.infer<typeof searchFormSchema>) => void;
};

const SearchForm = ({ form, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-secondary-foreground">City</FormLabel>
              <FormControl>
                <SelectField
                  placeholder="Where are you going?"
                  options={selectCityOptions}
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
                Check in
              </FormLabel>
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
              <FormLabel className="text-secondary-foreground">
                Check out
              </FormLabel>
              <FormControl>
                <DateField placeholder="Select a date" {...field} />
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
                  Number of adults
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Add adults" {...field} />
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
                  Number of children
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Add children" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          <Search className="mr-2" height={20} />
          <span className="text-lg">Search</span>
        </Button>
      </form>
    </Form>
  );
};

export default SearchForm;
