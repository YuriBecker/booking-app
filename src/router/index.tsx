/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, ScrollRestoration } from "react-router-dom";
import routerPaths from "./paths";
import React from "react";
import SuspenseRouteWrapper from "./suspense-route-wrapper";
import RouteErrorBoundary from "./error-boundary";
import Header from "@/components/Header";

const HomePage = React.lazy(() => import("@/pages/Home"));
const NotFoundPage = React.lazy(() => import("@/pages/NotFound"));
const BookingsPage = React.lazy(() => import("@/pages/Bookings"));
const SearchPage = React.lazy(() => import("@/pages/Search"));

const router = createBrowserRouter([
  {
    path: routerPaths.home,
    element: (
      <SuspenseRouteWrapper>
        <Header />
        <HomePage />
        <ScrollRestoration />
      </SuspenseRouteWrapper>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: routerPaths.search,
    element: (
      <SuspenseRouteWrapper>
        <Header />
        <SearchPage />
        <ScrollRestoration />
      </SuspenseRouteWrapper>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: routerPaths.myBookings,
    element: (
      <SuspenseRouteWrapper>
        <Header />
        <BookingsPage />
        <ScrollRestoration />
      </SuspenseRouteWrapper>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: (
      <SuspenseRouteWrapper>
        <NotFoundPage />
      </SuspenseRouteWrapper>
    ),
    errorElement: <RouteErrorBoundary />,
  },
]);

export default router;
