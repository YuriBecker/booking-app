import { Loader } from "@/components/ui/loader";
import NoData from "@/components/ui/no-data";
import routerPaths from "@/router/paths";
import { useNavigate } from "react-router-dom";
import useSearch from "./hooks/useSearch";
import SearchBreadCrumb from "./components/Breadcrumb";
import PropertyCard from "./components/PropertyCard";
import useBookProperty from "./hooks/useBookProperty";
import { SORT_OPTIONS, SortOption } from "./utils/sortProperties";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, StarIcon } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

const SORT_ICON_BY_OPTION = {
  [SortOption.PRICE_ASC]: ArrowDownIcon,
  [SortOption.PRICE_DESC]: ArrowUpIcon,
  [SortOption.RATING_DESC]: StarIcon,
};

const SearchPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    isLoading,
    isSuccess,
    error,
    availableProperties,
    showNoResults,
    checkIn,
    checkOut,
    sortOption,
    handleSortChange,
  } = useSearch();

  const { handleBookProperty } = useBookProperty({
    checkIn,
    checkOut,
  });

  if (isLoading) {
    return <Loader fixed />;
  }

  if (showNoResults || error) {
    return (
      <NoData
        className="bg-background container"
        buttonLabel={t("search.searchAgain")}
        onClick={() => navigate(routerPaths.home)}
        description={t("search.noResults")}
      />
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-8 mt-6 lg:mt-14 pb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SearchBreadCrumb />

          <div className="flex w-full flex-col gap-2 sm:w-auto">
            <span id="search-results-sort-label" className="text-sm font-medium">
              {t("search.sortBy")}
            </span>
            <div
              data-cy="search-results-sort"
              role="radiogroup"
              aria-labelledby="search-results-sort-label"
              className="flex gap-2"
            >
              {SORT_OPTIONS.map((option) => (
                <div key={option.value} className="group relative">
                  <Button
                    type="button"
                    role="radio"
                    tabIndex={0}
                    aria-checked={sortOption === option.value}
                    aria-label={t(`search.${option.value === SortOption.PRICE_ASC ? "priceAsc" : option.value === SortOption.PRICE_DESC ? "priceDesc" : "ratingDesc"}`)}
                    aria-describedby={`search-results-sort-${option.value}-tooltip`}
                    data-cy={`search-results-sort-${option.value}`}
                    variant={
                      sortOption === option.value ? "default" : "outline"
                    }
                    size="icon"
                    onClick={() => handleSortChange(option.value)}
                    className={cn(
                      "h-10 w-10",
                      sortOption === option.value &&
                        "hover:bg-primary/80"
                    )}
                  >
                    {(() => {
                      const Icon = SORT_ICON_BY_OPTION[option.value];

                      return <Icon className="h-4 w-4" aria-hidden="true" />;
                    })()}
                  </Button>
                  <span
                    id={`search-results-sort-${option.value}-tooltip`}
                    role="tooltip"
                    className="pointer-events-none absolute right-0 top-full z-20 mt-2 hidden w-max max-w-48 rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md group-focus-within:block group-hover:block"
                  >
                    {t(`search.${option.value === SortOption.PRICE_ASC ? "priceAsc" : option.value === SortOption.PRICE_DESC ? "priceDesc" : "ratingDesc"}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          data-cy="properties-list"
        >
          {availableProperties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              checkIn={checkIn}
              checkOut={checkOut}
              handleBookProperty={handleBookProperty}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default SearchPage;
