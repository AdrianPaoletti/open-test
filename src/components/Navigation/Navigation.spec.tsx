import React from "react";
import i18n from "../../i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import WizardContext from "../../store/context/WizardContext";

const setStepperCount = jest.fn();
const setStatusCode = jest.fn();
const setIsLoading = jest.fn();
const stepperCount = 2;
const formInputsValue = {
  createPassword: "12345678A",
  repeatPassword: "12345678A",
  passwordClue: "Letters and Numbers",
};

describe("Given a Navigation component", () => {
  beforeEach(() => {
    i18n.init();
    render(
      <WizardContext.Provider
        value={{
          setStepperCount,
          stepperCount,
          formInputsValue,
          setStatusCode,
          setIsLoading,
        }}
      >
        <Navigation />
      </WizardContext.Provider>
    );
  });
  describe("When is rendered and interactions are made", () => {
    test("Then it should call setStepperCount after firing the click event from the cancel button", () => {
      const cancelButton = screen.getByText("Cancel");

      fireEvent.click(cancelButton);

      expect(setStepperCount).toHaveBeenCalled();
    });

    test("Then it should call setStepperCount after firing the click event from the next button", async () => {
      const nextButton = screen.getByText("Next");

      await fireEvent.click(nextButton);

      expect(setStepperCount).toHaveBeenCalled();
    });
  });
});
