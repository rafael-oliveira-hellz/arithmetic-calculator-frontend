import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PreviewBox from ".";

describe("PreviewBox Component", () => {
  it("renders correctly with all props provided", () => {
    render(
      <PreviewBox
        operation="Soma"
        value1="10"
        value2="20"
        requiresSecondInput={true}
      />
    );

    expect(screen.getByText("Preview")).toBeInTheDocument();
    expect(screen.getByText("Operação selecionada:")).toBeInTheDocument();
    expect(screen.getByText("Soma")).toBeInTheDocument();
    expect(screen.getByText("Valor 1:")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Valor 2:")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("hides value2 when requiresSecondInput is false", () => {
    render(
      <PreviewBox
        operation="Subtração"
        value1="30"
        value2="15"
        requiresSecondInput={false}
      />
    );

    expect(screen.getByText("Preview")).toBeInTheDocument();
    expect(screen.getByText("Operação selecionada:")).toBeInTheDocument();
    expect(screen.getByText("Subtração")).toBeInTheDocument();
    expect(screen.getByText("Valor 1:")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.queryByText("Valor 2:")).not.toBeInTheDocument();
    expect(screen.queryByText("15")).not.toBeInTheDocument();
  });

  it('displays "N/A" for missing values', () => {
    render(
      <PreviewBox operation="" value1="" value2="" requiresSecondInput={true} />
    );

    const allNAElements = screen.getAllByText("N/A");
    expect(allNAElements.length).toBe(3);

    expect(screen.getByText("Operação selecionada:")).toBeInTheDocument();
    expect(screen.getByText("Valor 1:")).toBeInTheDocument();
    expect(screen.getByText("Valor 2:")).toBeInTheDocument();
  });
});
