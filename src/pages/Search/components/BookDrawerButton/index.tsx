import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Property } from "@/models/property";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { cn } from "@/utils/tailwind";
import {
  BathIcon,
  BedDoubleIcon,
  BedIcon,
  CalendarDaysIcon,
  LucideBaby,
  StarIcon,
  User,
} from "lucide-react";

type Props = {
  property: Property;
  checkInDate: string;
  checkOutDate: string;
  handleBookProperty: () => void;
};

const BookDrawerButton = ({
  property,
  checkInDate,
  checkOutDate,
  handleBookProperty,
}: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className="w-full hover:bg-secondary"
          data-cy="property-card-btn"
        >
          Book Now
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader className="text-left">
            <DrawerTitle>{property.title}</DrawerTitle>
            <DrawerDescription>{property.description}</DrawerDescription>
            <DrawerDescription className="font-bold">
              {property.location.city}, {property.location.state},{" "}
              {property.location.countryCode.toUpperCase()}
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="p-4 max-h-[60vh] md:max-h-[80vh] overflow-auto">
            <div className="flex flex-col gap-5">
              <img
                className="object-cover w-full rounded-lg aspect-[3/2]"
                src={property.images[0]}
                alt={property.title}
                loading="lazy"
                width={424}
                height={424}
              />

              <DrawerDescription className=" text-justify">
                {property.hostMessage}
              </DrawerDescription>

              <div className="grid grid-cols-2 items-center">
                <div className="text-left">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <StarIcon
                      className={cn(
                        "w-4 h-4 stroke-1",
                        property.reviews.reviewsCount && "fill-yellow-300"
                      )}
                    />
                    <span className="ml-1">{property.reviews.totalScore}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {property.reviews.reviewsCount} reviews
                  </p>
                </div>

                <div className="text-right">
                  <div
                    className={cn(
                      "text-2xl font-bold text-secondary",
                      property.price.hasPromotion &&
                        "line-through text-gray-500 text-md"
                    )}
                  >
                    {formatCurrency(property.price.perNight)}
                  </div>
                  {property.price.hasPromotion &&
                    property.price.promotionalPricePerNight && (
                      <div className="text-xl font-bold text-secondary">
                        {formatCurrency(
                          property.price.promotionalPricePerNight
                        )}
                      </div>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-2 justify-between">
                <div className="flex items-left gap-4 text-sm text-muted-foreground flex-col ">
                  <div className="flex items-center gap-2">
                    <BedIcon className="w-5 h-5 text-primary" />
                    <span>{property.numberOfBedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BedDoubleIcon className="w-5 h-5 text-primary" />
                    <span>{property.numberOfBedrooms} Bed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BathIcon className="w-5 h-5 text-primary" />
                    <span>{property.numberOfBathrooms} Bathroom</span>
                  </div>
                </div>

                <div className="flex items-end gap-4 text-sm text-muted-foreground flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-secondary" />
                    <span>{property.capacity.adults} Adults</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LucideBaby size={15} className="w-5 h-5 text-secondary" />

                    <span>{property.capacity.children} Children</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-bold">
                    Check-in: {formatDate(checkInDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-muted-foreground " />
                  <span className="text-sm text-muted-foreground font-bold">
                    Check-out: {formatDate(checkOutDate)}
                  </span>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DrawerFooter>
            <Button
              onClick={handleBookProperty}
              data-cy="property-card-reserve-btn"
            >
              Reserve
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BookDrawerButton;
