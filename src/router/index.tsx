/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import routerPaths from "./paths";
import React from "react";
import SuspenseRouteWrapper from "./suspense-route-wrapper";
import RouteErrorBoundary from "./error-boundary";

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const NotFoundPage = React.lazy(() => import("@/pages/NotFound"));

const router = createBrowserRouter([
  {
    path: routerPaths.home,
    element: (
      <SuspenseRouteWrapper>
        <HomePage />
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
