import PropertyCard from "@/components/property-card";
import { Loader } from "@/components/ui/loader";
import NoData from "@/components/ui/no-data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import routerPaths from "@/router/paths";
import { useGetPropertiesQuery } from "@/services/api-service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { isLoading, data, error, isSuccess } = useGetPropertiesQuery({
    page,
  });

  const list = data?.data || [];
  const last = data?.last;
  const isFirstPage = page === data?.first;
  const isLastPage = page === data?.last;

  const showNoResults = !isLoading && isSuccess && list.length === 0;

  if (isLoading) {
    return <Loader fixed />;
  }

  if (showNoResults || error) {
    return (
      <NoData
        className="bg-background container"
        buttonLabel="Search again"
        onClick={() => navigate(routerPaths.home)}
      />
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-8 mt-10 lg:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => {}}
            />
          ))}
        </div>

        <Pagination className="my-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={isFirstPage ? "pointer-events-none opacity-50" : ""}
                aria-disabled={isFirstPage}
                onClick={() => {
                  if (isFirstPage) return;

                  setPage(page - 1);
                }}
                href="#"
              />
            </PaginationItem>

            {Array.from({ length: last as number }, (_, index) => {
              if (
                index + 1 === data?.first ||
                index + 1 === page ||
                index + 1 === page - 1 ||
                index + 1 === page + 1 ||
                index + 1 === data?.last
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => {
                        setPage(index + 1);
                      }}
                      className={
                        index + 1 === page
                          ? "bg-secondary text-secondary-foreground hover:bg-secondary hover:opacity-90"
                          : ""
                      }
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (index + 1 === page - 2 || index + 1 === page + 2) {
                return (
                  <PaginationItem key={index}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              } else {
                return null;
              }
            })}

            <PaginationItem>
              <PaginationNext
                className={isLastPage ? "pointer-events-none opacity-50" : ""}
                onClick={() => {
                  if (isLastPage) return;

                  setPage(page + 1);
                }}
                aria-disabled={isLastPage}
                href="#"
              >
                {last}
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  }
};

export default SearchPage;
