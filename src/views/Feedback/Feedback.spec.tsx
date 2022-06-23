import React from "react";
import i18n from "../../i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import Feedback from "./Feedback";
import WizardContext from "../../store/context/WizardContext";

const setStepperCount = jest.fn();
const renderFunction = (status: number, loading: boolean) => {
  render(
    <WizardContext.Provider
      value={{
        setStepperCount,
        isLoading: loading,
        statusCode: status,
      }}
    >
      <Feedback />
    </WizardContext.Provider>
  );
};

describe("Given a Feedback view", () => {
  beforeEach(() => {
    i18n.init();
  });
  describe("When codeStatus is equal to 200", () => {
    test("Then it should not call setStepperCount function", () => {
      renderFunction(200, false);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      expect(setStepperCount).not.toHaveBeenCalled();
    });
  });

  describe("When codeStatus is equal to 200", () => {
    test("Then it should not call setStepperCount function", () => {
      renderFunction(401, false);
      const button = screen.getByRole("button");

      fireEvent.click(button);

      expect(setStepperCount).toHaveBeenCalled();
    });
  });

  describe("When codeStatus is equal to 200", () => {
    test("Then it should not call setStepperCount function", () => {
      renderFunction(200, true);

      expect(screen.queryByText("Access")).not.toBeInTheDocument();
    });
  });
});
