import { PaginatedData } from "@/models/pagination";
import { Property } from "@/models/property";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;
const PROPERTIES_PER_PAGE = 15;

type GetPropertiesQuery = {
  page: number;
  sort?: string;
};

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getProperties: builder.query<PaginatedData<Property[]>, GetPropertiesQuery>(
      {
        query: ({
          page,
          sort = "-reviews.totalScore,-reviews.reviewsCount",
        }) => ({
          url: "properties",
          params: {
            _page: page,
            _per_page: PROPERTIES_PER_PAGE,
            _sort: sort,
          },
        }),
      }
    ),
    getProperty: builder.query<Property, string>({
      query: (id) => `properties/${id}`,
    }),
  }),
});

export const { useGetPropertiesQuery, useGetPropertyQuery } = apiService;
