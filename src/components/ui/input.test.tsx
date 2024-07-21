import { render } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Input placeholder="test" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
