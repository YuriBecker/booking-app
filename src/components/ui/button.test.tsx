import { Button } from "@/components/ui/button";
import { render } from "@testing-library/react";

describe("Button component", () => {
  it("renders correctly with default variant", () => {
    const { asFragment } = render(<Button>Hello</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with destructive variant", () => {
    const { asFragment } = render(<Button variant="destructive">Hello</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with outline variant", () => {
    const { asFragment } = render(<Button variant="outline">Hello</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with secondary variant", () => {
    const { asFragment } = render(<Button variant="secondary">Hello</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with ghost variant", () => {
    const { asFragment } = render(<Button variant="ghost">Hello</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly with link variant", () => {
    const { asFragment } = render(<Button variant="link">Hello</Button>);
    expect(asFragment()).toMatchSnapshot();
  });
});
