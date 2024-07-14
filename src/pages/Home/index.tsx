import { DateField } from "@/components/ui/date-input";
import { SelectField } from "@/components/ui/select-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import routerPaths from "@/router/paths";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie";
import { createSearchParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import animationData from "public/vacation.json";

const formSchema = z
  .object({
    city: z.string().optional(),
    checkIn: z.date().optional(),
    checkOut: z.date().optional(),
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

const cityOptions = [
  {
    value: "",
    label: "I'm flexible",
  },
  {
    value: "Los Angeles",
    label: "Los Angeles",
  },
  {
    value: "San Diego",
    label: "San Diego",
  },
  {
    value: "San Francisco",
    label: "San Francisco",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numOfAdults: 1,
      numOfChildren: 0,
      checkIn: addDays(new Date(), 1),
      checkOut: addDays(new Date(), 8),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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

  return (
    <div className="bg-secondary w-full">
      <div className="container mx-auto px-8 pt-10">
        <h1 className="text-3xl text-secondary-foreground font-bold">
          Find your next stay at{" "}
          <span className="text-primary">California</span>
        </h1>
        <p className="text-md text-secondary-foreground mt-2">
          Search deals on hotels, homes, and much more...
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 lg:mt-12">
          <div className="h-72 sm:h-[400px] pointer-events-none">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              isClickToPauseDisabled
            />
          </div>

          <div className="flex flex-col justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary-foreground">
                        City
                      </FormLabel>
                      <FormControl>
                        <SelectField
                          placeholder="Where are you going?"
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
                          <Input
                            type="number"
                            placeholder="Add adults"
                            min={1}
                            {...field}
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
                          Number of children
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Add children"
                            min={0}
                            {...field}
                          />
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
          </div>
        </div>
      </div>

      <svg
        className="transform -translate-y-[-1px] my-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#f3f3f7"
          fillOpacity="1"
          d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default HomePage;
