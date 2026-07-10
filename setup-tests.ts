import "@testing-library/jest-dom/vitest";
import { server } from "./src/mocks/node";
import { vi } from "vitest";
import i18n from "./src/i18n";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  void i18n.changeLanguage("en");
});

afterAll(() => {
  server.close();
});

// Mocking methods which are not implemented in JSDOM
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
