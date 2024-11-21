import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OperationSelect from ".";

const options = [
  { id: "1", type: "ADDITION", cost: 5 },
  { id: "2", type: "SUBTRACTION", cost: 5 },
  { id: "3", type: "MULTIPLICATION", cost: 10 },
];

describe("OperationSelect Component", () => {
  const mockOnChange = jest.fn();

  beforeAll(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  const setup = (value = "") =>
    render(
      <OperationSelect
        options={options}
        placeholder="Select Operation"
        value={value}
        onChange={mockOnChange}
      />
    );

  it("calls the onChange callback with the correct value when an option is clicked", () => {
    setup();

    const menuButton = screen.getByTestId("operation-select");
    fireEvent.click(menuButton);

    const additionOption = screen.getByText("ADDITION (Cost: 5)");
    fireEvent.click(additionOption);

    expect(mockOnChange).toHaveBeenCalledWith("ADDITION");
  });
});
