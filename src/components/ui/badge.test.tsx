import { render } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge component", () => {
  it("renders correctly with default variant", () => {
    const { asFragment } = render(<Badge>Hello</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with secondary variant", () => {
    const { asFragment } = render(<Badge variant="secondary">Hello</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with destructive variant", () => {
    const { asFragment } = render(<Badge variant="destructive">Hello</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with outline variant", () => {
    const { asFragment } = render(<Badge variant="outline">Hello</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });
});
