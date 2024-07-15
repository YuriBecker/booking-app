import { render } from "@testing-library/react";
import { Input } from "@/components/ui/input";

test("Input component renders correctly", () => {
  const { asFragment } = render(<Input placeholder="test" />);
  expect(asFragment()).toMatchSnapshot();
});
