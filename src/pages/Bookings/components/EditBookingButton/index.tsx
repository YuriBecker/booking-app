import { Button } from "@/components/ui/button";
import { DateInput } from "@/components/ui/date-input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Booking } from "@/models/booking";
import useDrawer from "./hooks/useDrawer";
import useEditForm from "./hooks/useEditForm";

const EditBookingButton = ({
  onEdit,
  booking,
}: {
  onEdit: (updatedBooking: Booking) => void;
  booking: Booking;
}) => {
  const { isOpen, setIsOpen } = useDrawer();

  const { form, onSubmit } = useEditForm({
    booking,
    onEdit,
    setIsOpen,
  });

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" className="w-full" data-cy="booking-card-edit-btn">
          Edit dates
        </Button>
      </DrawerTrigger>
      <DrawerContent data-cy="edit-booking-dialog">
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
                        <DateInput
                          placeholder="Select a date"
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
                      <FormLabel>Check out</FormLabel>
                      <FormControl>
                        <DateInput
                          placeholder="Select a date"
                          dataCy="check-out-date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter>
                <Button type="submit" data-cy="booking-card-confirm-edit-btn">
                  Edit
                </Button>
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

export default EditBookingButton;
