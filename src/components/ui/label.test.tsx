import { render } from "@testing-library/react";
import { Label } from "@/components/ui/label";

test("Label component renders correctly", () => {
  const { asFragment } = render(<Label>Test</Label>);
  expect(asFragment()).toMatchSnapshot();
});
