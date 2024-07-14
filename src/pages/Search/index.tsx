import PropertyCard from "@/components/property-card";
import { Loader } from "@/components/ui/loader";
import NoData from "@/components/ui/no-data";
import routerPaths from "@/router/paths";
import { useNavigate } from "react-router-dom";
import useSearch from "./hooks/useSearch";

const SearchPage = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess, error, availableProperties, showNoResults } =
    useSearch();

  if (isLoading) {
    return <Loader fixed />;
  }

  if (showNoResults || error) {
    return (
      <NoData
        className="bg-background container"
        buttonLabel="Search again"
        onClick={() => navigate(routerPaths.home)}
        description="Sorry, we couldn't find any available property"
      />
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-8 mt-10 lg:mt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableProperties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    );
  }
};

export default SearchPage;
