import { http, HttpResponse } from "msw";
import jsonMock from "../../database/db.json";

const API_URL = "http://localhost:3001/";

export const handlers = [
  http.get(`${API_URL}properties`, () => {
    return HttpResponse.json(jsonMock.properties);
  }),

  http.get(`${API_URL}properties/:id`, () => {
    const property = jsonMock.properties[0];

    return HttpResponse.json(property);
  }),
];
