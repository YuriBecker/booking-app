import { Property } from "@/models/property";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;
const SORT_MOST_REVIEWED = "-reviews.totalScore,-reviews.reviewsCount";

type GetPropertiesQuery = {
  params?: Record<string, string | number>;
};

export const apiService = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getProperties: builder.query<Property[], GetPropertiesQuery>({
      query: ({ params = {} }) => ({
        url: "properties",
        params: {
          _sort: SORT_MOST_REVIEWED,
          ...params,
        },
      }),
    }),
    getProperty: builder.query<Property, string>({
      query: (id) => `properties/${id}`,
    }),
  }),
});

export const { useGetPropertiesQuery, useGetPropertyQuery } = apiService;
