import { render } from "@testing-library/react";
import { Label } from "@/components/ui/label";

describe("Label component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Label>Test</Label>);
    expect(asFragment()).toMatchSnapshot();
  });
});
