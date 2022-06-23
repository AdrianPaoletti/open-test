import React from "react";
import i18n from "../../i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductInformation from "./ProductInformation";
import WizardContext from "../../store/context/WizardContext";

const setIsDisable = jest.fn();

describe("Given a ProductInformation view", () => {
  describe("When is rendered and the checkbox is checked", () => {
    test("Then it should call setIsDisable function after firing the click event from the checkbox", () => {
      i18n.init();
      render(
        <WizardContext.Provider
          value={{
            setIsDisable,
          }}
        >
          <ProductInformation />
        </WizardContext.Provider>
      );
      const checkbox = screen.getByRole("checkbox");

      fireEvent.click(checkbox, { target: { checked: true } });

      expect(setIsDisable).toHaveBeenCalled();
    });
  });
});
