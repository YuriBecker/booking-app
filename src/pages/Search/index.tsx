import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetPropertiesQuery } from "@/services/apiService";
import { useState } from "react";

const SearchPage = () => {
  const [page, setPage] = useState(1);

  const { isLoading, data, error, isSuccess } = useGetPropertiesQuery({
    page,
  });

  const list = data?.data || [];
  const last = data?.last;
  const isFirstPage = page === data?.first;
  const isLastPage = page === data?.last;

  console.log({
    isLoading,
    data,
    error,
    isSuccess,
  });

  if (isLoading) return;

  if (isSuccess) {
    return (
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list?.map((property) => (
            <div key={property.id}>
              <div>{property.title}</div>
              <div>{property.description}</div>
              <div className="overflow-hidden rounded-sm">
                <img
                  className="object-cover aspect-square w-full transform transition-all duration-200 hover:scale-105"
                  src={property.images[0]}
                  alt={property.title}
                  loading="lazy"
                  width={424}
                  height={424}
                />
              </div>
            </div>
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
