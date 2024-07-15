import { render } from "@testing-library/react";
import { Calendar } from "@/components/ui/calendar";

test("Calendar component renders correctly in single mode", () => {
  const { asFragment } = render(
    <Calendar mode="single" selected={new Date(2024, 0, 1)} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("Calendar component renders correctly in range mode", () => {
  const { asFragment } = render(
    <Calendar
      mode="range"
      selected={{
        from: new Date(2024, 0, 1),
        to: new Date(2024, 0, 5),
      }}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("Calendar component renders correctly in multiple mode", () => {
  const { asFragment } = render(
    <Calendar
      mode="multiple"
      selected={[new Date(2024, 0, 1), new Date(2024, 0, 5)]}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
