import { describe, expect, it } from "vitest";
import { addDays, formatLongDate } from "./dates";

describe("date utilities", () => {
  it("adds calendar days without mutating the original date", () => {
    const original = new Date(2024, 1, 28, 12);

    const result = addDays(original, 2);

    expect(result).toEqual(new Date(2024, 2, 1, 12));
    expect(original).toEqual(new Date(2024, 1, 28, 12));
  });

  it.each([
    [new Date(2024, 1, 1), "February 1, 2024"],
    [new Date(2024, 1, 2), "February 2, 2024"],
    [new Date(2024, 1, 3), "February 3, 2024"],
    [new Date(2024, 1, 11), "February 11, 2024"],
    [new Date(2024, 1, 22), "February 22, 2024"],
  ])("formats %s as %s", (date, expected) => {
    expect(formatLongDate(date)).toBe(expected);
  });
});
