import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import i18n from "./i18n";
import WizardContext from "./store/context/WizardContext";
import App from "./App";

const formInputsValue = {
  createPassword: "12345678A",
  repeatPassword: "12345678A",
  passwordClue: "Letters and Numbers",
};
const renderFunction = (count: number) => {
  render(
    <WizardContext.Provider
      value={{
        stepperCount: count,
        setIsDisable: jest.fn(),
        setFormInputsValue: jest.fn(),
        formInputsValue,
        isLoading: false,
        statusCode: 200,
      }}
    >
      <App />
    </WizardContext.Provider>
  );
};

describe("Given an App component", () => {
  beforeEach(() => {
    i18n.init();
  });
  describe("When is rendered and stepperCount equals to '1'", () => {
    test("Then it should render the 'How it works' h3 title", () => {
      renderFunction(1);

      expect(screen.getByText("How it works")).toBeInTheDocument();
    });
  });

  describe("When is rendered and stepperCount equals to '2'", () => {
    test("Then it should render the 'Create your hint to remember your password (optional)' h3 label", () => {
      renderFunction(2);

      expect(
        screen.getByText(
          "Create your hint to remember your password (optional)"
        )
      ).toBeInTheDocument();
    });
  });

  describe("When is rendered and stepperCount equals to '3'", () => {
    test("Then it should render the 'Access' button", () => {
      renderFunction(3);

      expect(screen.getByText("Access")).toBeInTheDocument();
    });
  });

  describe("When selecting the English language", () => {
    test("Then the value of the select element should be 'en'", () => {
      renderFunction(1);
      const option = screen.getAllByRole("option");
      const selectElement = screen.getByRole("combobox");

      fireEvent.click(option[1]);
      fireEvent.change(selectElement, {
        target: { value: "en" },
      });

      expect(selectElement).toHaveValue("en");
    });
  });
});
