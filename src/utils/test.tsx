import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "@/store";
import type { AppStore, RootState } from "@/store";
import { MemoryRouter } from "react-router-dom";
import i18n, { type SupportedLocale } from "@/i18n";

type ExtendedRenderOptions = Omit<RenderOptions, "wrapper"> & {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  locale?: SupportedLocale;
};

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupStore(preloadedState),
    locale = "en",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  i18n.changeLanguage(locale);
  function AllTheProviders({ children }: PropsWithChildren): React.JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};
