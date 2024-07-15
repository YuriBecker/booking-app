import { render } from "@testing-library/react";
import { SelectField } from "@/components/ui/select-input";

test("SelectField component renders correctly with value", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const { asFragment } = render(
    <SelectField
      id="select-field"
      value="1"
      onChange={() => {}}
      options={options}
      placeholder="Select an option"
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

test("SelectField component renders correctly without value", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const { asFragment } = render(
    <SelectField
      id="select-field"
      onChange={() => {}}
      options={options}
      placeholder="Select an option"
    />
  );

  expect(asFragment()).toMatchSnapshot();
});
