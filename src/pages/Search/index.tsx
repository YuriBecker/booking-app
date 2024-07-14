import PropertyCard from "@/components/property-card";
import { Loader } from "@/components/ui/loader";
import NoData from "@/components/ui/no-data";
import routerPaths from "@/router/paths";
import { Link, useNavigate } from "react-router-dom";
import useSearch from "./hooks/useSearch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SearchPage = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    isSuccess,
    error,
    availableProperties,
    showNoResults,
    checkIn,
    checkOut,
  } = useSearch();

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
      <div className="container mx-auto px-8 mt-6 lg:mt-14 pb-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={routerPaths.home}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Search Results</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableProperties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default SearchPage;
