import React from "react";
import i18n from "../../../i18n";
import { fireEvent, render, screen } from "@testing-library/react";
import FormPassword from "./FormPassword";

const handleChange = jest.fn();
const isRepeatPasswordError = false;
const formInputsValue = {
  createPassword: "12345678A",
  repeatPassword: "12345678A",
  passwordClue: "Letters and Numbers",
};
const passwordError = {
  isPasswordError: true,
  textPasswordError: "Error length",
};

describe("Given a FormPassword component", () => {
  beforeEach(() => {
    i18n.init();
    render(
      <FormPassword
        formInputsValue={formInputsValue}
        handleChange={handleChange}
        isRepeatPasswordError={isRepeatPasswordError}
        passwordError={passwordError}
      />
    );
  });

  describe("When the value of the passwordInput is changed", () => {
    test("Then it should match the content value provided", () => {
      const passwordInput = screen.getByTestId("createPassword");

      fireEvent.change(passwordInput, {
        target: { value: "12345678A" },
      });

      expect(passwordInput).toHaveValue("12345678A");
    });
  });

  describe("When the value of the repeatPasswordInput is changed", () => {
    test("Then it should match the content value provided", () => {
      const repeatPasswordInput = screen.getByTestId("repeatPassword");

      fireEvent.change(repeatPasswordInput, {
        target: { value: "12345678A" },
      });

      expect(repeatPasswordInput).toHaveValue("12345678A");
    });
  });

  describe("When showImage icon from passwordInput is clicked", () => {
    test("Then it should change input type", () => {
      const images = screen.getAllByRole("img");
      const passwordInput = screen.getByTestId("createPassword");

      fireEvent.click(images[0]);

      expect(passwordInput).toHaveAttribute("type", "text");
    });
  });

  describe("When showImage icon from repeatPasswordInput is clicked", () => {
    test("Then it should change input type", () => {
      const images = screen.getAllByRole("img");
      const passwordInput = screen.getByTestId("repeatPassword");

      fireEvent.click(images[1]);

      expect(passwordInput).toHaveAttribute("type", "text");
    });
  });
});
