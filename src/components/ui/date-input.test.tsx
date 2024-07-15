import { render } from "@testing-library/react";
import { DateInput } from "@/components/ui/date-input";

test("DateInput component renders correctly", () => {
  const fixedDate = new Date(2024, 1, 1);

  const { asFragment } = render(
    <DateInput
      placeholder="Select a date"
      onChange={() => {}}
      value={fixedDate}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
