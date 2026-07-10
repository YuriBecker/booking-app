import useBookingHandlers from "@/hooks/useBookingHandlers";
import { useGetPropertiesQuery } from "@/services/api-service";
import { addDays } from "@/utils/dates";
import { useSearchParams } from "react-router-dom";
import {
  getPropertySortOption,
  sortProperties,
  SortOption,
} from "../utils/sortProperties";

const useSearchData = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get("city") || "";
  const checkIn = searchParams.get("checkIn") || new Date().toISOString();
  const checkOut =
    searchParams.get("checkOut") || addDays(new Date(), 1).toISOString();
  const numOfAdults = Number(searchParams.get("numOfAdults"));
  const numOfChildren = Number(searchParams.get("numOfChildren"));
  const sortOption = getPropertySortOption(searchParams.get("sort"));

  const handleSortChange = (sortValue: SortOption) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);

      if (sortValue === SortOption.RATING_DESC) {
        nextParams.delete("sort");
      } else {
        nextParams.set("sort", sortValue);
      }

      return nextParams;
    });
  };

  return {
    city,
    checkIn,
    checkOut,
    numOfAdults,
    numOfChildren,
    sortOption,
    handleSortChange,
  };
};

const useSearch = () => {
  const { verifyIfPropertyIsAvailable } = useBookingHandlers();

  const {
    checkIn,
    checkOut,
    city,
    numOfAdults,
    numOfChildren,
    sortOption,
    handleSortChange,
  } =
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
    verifyIfPropertyIsAvailable({
      propertyId: property.id,
      checkIn,
      checkOut,
    })
  );
  const sortedAvailableProperties = sortProperties(
    availableProperties,
    sortOption
  );

  const showNoResults =
    !isLoading && isSuccess && availableProperties.length === 0;

  return {
    isLoading,
    error,
    isSuccess,
    availableProperties: sortedAvailableProperties,
    showNoResults,
    checkIn,
    checkOut,
    sortOption,
    handleSortChange,
  };
};

export default useSearch;
