import React from "react";
import { render, screen } from "@testing-library/react";
import Stepper from "./Stepper";
import WizardContext from "../../store/context/WizardContext";

const renderFunction = (step: number) => {
  render(
    <WizardContext.Provider
      value={{
        stepperCount: step,
      }}
    >
      <Stepper />
    </WizardContext.Provider>
  );
};

describe("Given a Stepper component", () => {
  describe("When is rendered with a stepperCount value of 1", () => {
    test("Then numbers '1', '2' and '3' should be in the document", () => {
      renderFunction(1);

      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("When is rendered with a stepperCount value of 2", () => {
    test("Then numbers '2' and '3' should be in the document", () => {
      renderFunction(2);

      expect(screen.queryByText("1")).not.toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });

  describe("When is rendered with a stepperCount value of 3", () => {
    test("Then just the number '3' should be in the document", () => {
      renderFunction(3);

      expect(screen.queryByText("1")).not.toBeInTheDocument();
      expect(screen.queryByText("2")).not.toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });
  });
});
