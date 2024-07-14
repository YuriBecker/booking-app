import useBookingReservation from "@/hooks/useBookingReservation";
import { useGetPropertiesQuery } from "@/services/api-service";
import { addDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

const useSearchData = () => {
  const [searchParams] = useSearchParams();

  const city = searchParams.get("city") || "";
  const checkIn = searchParams.get("checkIn") || new Date().toISOString();
  const checkOut =
    searchParams.get("checkOut") || addDays(new Date(), 1).toISOString();
  const numOfAdults = Number(searchParams.get("numOfAdults"));
  const numOfChildren = Number(searchParams.get("numOfChildren"));

  return {
    city,
    checkIn,
    checkOut,
    numOfAdults,
    numOfChildren,
  };
};

const useSearch = () => {
  const { verifyIfPropertyIsAvailable } = useBookingReservation();

  const { checkIn, checkOut, city, numOfAdults, numOfChildren } =
    useSearchData();

  const { isLoading, data, error, isSuccess } = useGetPropertiesQuery({
    params: {
      "location.city": city,
      "capacity.adults_gte": numOfAdults,
      "capacity.children_gte": numOfChildren,
    },
  });

  const allProperties = data || [];
  const availableProperties = allProperties.filter((property) =>
    verifyIfPropertyIsAvailable(property.id, checkIn, checkOut)
  );

  const showNoResults =
    !isLoading && isSuccess && availableProperties.length === 0;

  return {
    isLoading,
    error,
    isSuccess,
    availableProperties,
    showNoResults,
    checkIn,
    checkOut,
  };
};

export default useSearch;
