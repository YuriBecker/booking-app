import { render } from "@testing-library/react";
import { Calendar } from "@/components/ui/calendar";

test("Calendar component renders correctly in single mode", () => {
  const { asFragment } = render(<Calendar mode="single" />);
  expect(asFragment()).toMatchSnapshot();
});

test("Calendar component renders correctly in range mode", () => {
  const { asFragment } = render(<Calendar mode="range" />);
  expect(asFragment()).toMatchSnapshot();
});

test("Calendar component renders correctly in multiple mode", () => {
  const { asFragment } = render(<Calendar mode="multiple" />);
  expect(asFragment()).toMatchSnapshot();
});
