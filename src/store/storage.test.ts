import { afterEach, describe, expect, it, vi } from "vitest";
import storage from "./storage";

describe("storage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects when reading localStorage throws", async () => {
    const error = new DOMException("Storage is unavailable");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw error;
    });

    const result = storage.getItem("key");

    expect(result).toBeInstanceOf(Promise);
    await expect(result).rejects.toBe(error);
  });

  it("rejects when writing to localStorage throws", async () => {
    const error = new DOMException("Quota exceeded", "QuotaExceededError");
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw error;
    });

    const result = storage.setItem("key", "value");

    expect(result).toBeInstanceOf(Promise);
    await expect(result).rejects.toBe(error);
  });

  it("rejects when removing from localStorage throws", async () => {
    const error = new DOMException("Storage is unavailable");
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw error;
    });

    const result = storage.removeItem("key");

    expect(result).toBeInstanceOf(Promise);
    await expect(result).rejects.toBe(error);
  });
});
