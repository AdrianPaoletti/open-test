import React from "react";
import i18n from "../../i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./Form";
import WizardContext from "../../store/context/WizardContext";

const setIsDisable = jest.fn();
const setFormInputsValue = jest.fn();
const renderFunction = (inputsValue: {
  createPassword: string;
  repeatPassword: string;
  passwordClue: string;
}) => {
  render(
    <WizardContext.Provider
      value={{
        setIsDisable,
        setFormInputsValue,
        formInputsValue: inputsValue,
      }}
    >
      <Form />
    </WizardContext.Provider>
  );
};

describe("Given a Form view", () => {
  beforeEach(() => {
    i18n.init();
  });
  describe("When inputClue value is changed", () => {
    test("Then it should contain the value changed", () => {
      const formInputsValue = {
        createPassword: "12345678A",
        repeatPassword: "12345678A",
        passwordClue: "Letters and Numbers",
      };
      renderFunction(formInputsValue);
      const inputClue = screen.getByRole("textbox");

      fireEvent.change(inputClue, { target: { value: "Words and Numbers" } });

      expect(inputClue).toHaveValue("Words and Numbers");
    });
  });

  describe("When createPassword and repeatPassword not match", () => {
    test("Then it should call setIsDisable function", () => {
      const formInputsValue = {
        createPassword: "12345678A",
        repeatPassword: "",
        passwordClue: "Letters and Numbers",
      };
      renderFunction(formInputsValue);
      const inputRepeat = screen.getByTestId("repeatPassword");

      fireEvent.change(inputRepeat, { target: { value: "123456" } });

      expect(setIsDisable).toHaveBeenCalled();
    });
  });

  describe("When createPassword input is less than 8 characters", () => {
    test("Then it should show' Minimum 8 characters' error text", () => {
      const formInputsValue = {
        createPassword: "",
        repeatPassword: "",
        passwordClue: "Letters and Numbers",
      };
      renderFunction(formInputsValue);
      const inputPassword = screen.getByTestId("createPassword");

      fireEvent.change(inputPassword, { target: { value: "123456" } });

      expect(setFormInputsValue).toHaveBeenCalled();
      expect(screen.getByText("Minimum 8 characters")).toBeInTheDocument();
    });
  });

  describe("When createPassword length is bigger than 7 and input has incorrect requirements", () => {
    test("Then it should show 'Must contain at least 1 number and one uppercase' error text", () => {
      const formInputsValue = {
        createPassword: "",
        repeatPassword: "",
        passwordClue: "Letters and Numbers",
      };
      renderFunction(formInputsValue);
      const inputPassword = screen.getByTestId("createPassword");

      fireEvent.change(inputPassword, { target: { value: "12345678a" } });

      expect(setFormInputsValue).toHaveBeenCalled();
      expect(
        screen.getByText("Must contain at least 1 number and one uppercase")
      ).toBeInTheDocument();
    });
  });

  describe("When createPassword length is bigger than 7 and input has correct requirements", () => {
    test("Then it should not show 'Must contain at least 1 number and one uppercase' error text", () => {
      const formInputsValue = {
        createPassword: "",
        repeatPassword: "",
        passwordClue: "Letters and Numbers",
      };
      renderFunction(formInputsValue);
      const inputPassword = screen.getByTestId("createPassword");

      fireEvent.change(inputPassword, { target: { value: "12345678A" } });

      expect(setFormInputsValue).toHaveBeenCalled();
      expect(
        screen.queryByText("Must contain at least 1 number and one uppercase")
      ).not.toBeInTheDocument();
    });
  });

  describe("When repeatPassword does not match createPassword", () => {
    test("Then it should show 'Password mismatch' error text", () => {
      const formInputsValue = {
        createPassword: "12345678A",
        repeatPassword: "",
        passwordClue: "Letters and Numbers",
      };
      renderFunction(formInputsValue);
      const inputRepeat = screen.getByTestId("repeatPassword");

      fireEvent.change(inputRepeat, { target: { value: "12345678a" } });

      expect(setFormInputsValue).toHaveBeenCalled();
      expect(screen.getByText("Password mismatch")).toBeInTheDocument();
    });
  });

  describe("When repeatPassword match createPassword", () => {
    test("Then it should call setIsDisable function", () => {
      const formInputsValue = {
        createPassword: "12345678A",
        repeatPassword: "",
        passwordClue: "Letters and Numbers",
      };
      renderFunction(formInputsValue);
      const inputRepeat = screen.getByTestId("repeatPassword");

      fireEvent.change(inputRepeat, { target: { value: "12345678A" } });

      expect(setFormInputsValue).toHaveBeenCalled();
      expect(setIsDisable).toHaveBeenCalled();
    });
  });
});
