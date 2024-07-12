const routerPaths = {
  home: "/",
  search: "/search",
  propertyDetails: (id: string) => `/property/${id}`,
  myBookings: "/bookings",
  bookDetails: (id: string) => `/book/${id}`,
};

export default routerPaths;
