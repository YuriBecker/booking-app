import i18n, { LOCALE_STORAGE_KEY, setLocale } from "./index";

describe("localization", () => {
  it("switches to Brazilian Portuguese and persists the explicit choice", async () => {
    await setLocale("pt-BR");

    expect(i18n.t("header.myBookings")).toBe("Minhas reservas");
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(document.title).toBe("Aplicativo de Reservas");
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe("pt-BR");

    await setLocale("en");
  });
});
