import React, { useContext, useEffect, useState } from "react";
import "./Form.scss";
import WizardContext from "../../store/context/WizardContext";
import FormPassword from "./FormPassword/FormPassword";
import { PasswordError } from "./Form.model";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { setIsDisable, formInputsValue, setFormInputsValue } =
    useContext(WizardContext);
  const { t } = useTranslation(["forms"]);
  const [passwordError, setPasswordError] = useState<PasswordError>({
    isPasswordError: false,
    textPasswordError: "",
  });
  const [isRepeatPasswordError, setIsRepeatPasswordError] =
    useState<boolean>(false);
  const clueInputMaxLength = 255;

  useEffect(() => {
    setIsDisable(true);
  }, []);

  useEffect(() => {
    if (
      formInputsValue.createPassword.length > 0 &&
      formInputsValue.createPassword === formInputsValue.repeatPassword
    ) {
      return setIsDisable(false);
    }
    return setIsDisable(true);
  }, [formInputsValue]);

  const passwordNumberUpperCaseCheck = (password: string) => {
    if ((password.match(/[A-Z]/) && password.match(/\d/)) || !password.length) {
      return setPasswordError({ ...passwordError, isPasswordError: false });
    }
    return setPasswordError({
      isPasswordError: true,
      textPasswordError: "forms:should_have_one",
    });
  };

  const repeatPasswordCheck = (password: string, repeatPassword: string) => {
    if (password === repeatPassword) {
      return setIsRepeatPasswordError(false);
    }
    return setIsRepeatPasswordError(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormInputsValue({
      ...formInputsValue,
      [event.target.id]: event.target.value,
    });
    if (event.target.id === "createPassword") {
      return value.length && value.length < 8
        ? setPasswordError({
            isPasswordError: true,
            textPasswordError: "forms:minimum_8_characters",
          })
        : passwordNumberUpperCaseCheck(value);
    }
    if (event.target.id === "repeatPassword") {
      return value.length < 8
        ? setIsRepeatPasswordError(false)
        : repeatPasswordCheck(formInputsValue.createPassword, value);
    }
  };

  return (
    <div className="form">
      <p>{t("forms:at_first_place")}</p>
      <p>{t("forms:could_not_restore_password")}</p>
      <FormPassword
        formInputsValue={formInputsValue}
        passwordError={passwordError}
        isRepeatPasswordError={isRepeatPasswordError}
        handleChange={handleChange}
      />
      <div className="form__clue-container">
        <p>{t("forms:also_create_hint")}</p>
        <label htmlFor="passwordClue">{t("forms:create_your_clue")}</label>
        <input
          type="text"
          id="passwordClue"
          className="form__input"
          placeholder={t("forms:introduce_hint")}
          onChange={handleChange}
          minLength={0}
          maxLength={clueInputMaxLength}
        />
        <span className="form__clue-counter">{`${formInputsValue.passwordClue.length}/${clueInputMaxLength}`}</span>
      </div>
    </div>
  );
};

export default Form;
