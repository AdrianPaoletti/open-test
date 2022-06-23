import React, { useState } from "react";
import showIconPath from "../../../assets/images/show.svg";
import hideIconPath from "../../../assets/images/hide.svg";
import { FormInputsModel } from "../../../core/models/FormInputsModel";
import "./FormPassword.scss";
import { Inputs, PasswordError } from "../Form.model";
import { useTranslation } from "react-i18next";

interface FormPasswordProps {
  formInputsValue: FormInputsModel;
  passwordError: PasswordError;
  isRepeatPasswordError: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormPassword = ({
  formInputsValue,
  handleChange,
  isRepeatPasswordError,
  passwordError: { isPasswordError, textPasswordError },
}: FormPasswordProps) => {
  const { t } = useTranslation(["forms"]);
  const [showCreatePassword, setShowCreatePassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const inputs: Array<Inputs> = [
    {
      id: "createPassword",
      label: "forms:create_your_master_password",
      placeholder: "forms:create_your_password",
      show: showCreatePassword,
      error: isPasswordError,
      textError: textPasswordError,
      setShow: setShowCreatePassword,
    },
    {
      id: "repeatPassword",
      label: "forms:repeat_your_master_password",
      placeholder: "forms:repeat_your_password",
      show: showRepeatPassword,
      error: isRepeatPasswordError,
      textError: "forms:err_password_mismatch",
      setShow: setShowRepeatPassword,
      disable: formInputsValue.createPassword.length < 8 || isPasswordError,
    },
  ];

  return (
    <div className="password-form">
      {inputs.map((input) => (
        <div className="password-form__password-container" key={input.id}>
          <label htmlFor={input.id}>{t(input.label)}</label>
          <div className="password-form__input-container">
            <input
              type={input.show ? "text" : "password"}
              id={input.id}
              placeholder={t(input.placeholder)}
              className={`password-form__input ${
                input.error ? "password-form__input--error" : ""
              }`}
              onChange={handleChange}
              minLength={8}
              maxLength={24}
              data-testid={input.id}
              disabled={input.disable ? input.disable : false}
            />
            <img
              src={input.show ? hideIconPath : showIconPath}
              width={26}
              alt="show password"
              onClick={
                formInputsValue.createPassword.length > 0
                  ? () => input.setShow(!input.show)
                  : undefined
              }
            />
          </div>
          <p
            className={
              input.error
                ? "password-form__error password-form__error--format"
                : "password-form__error--hide"
            }
          >
            {t(input.textError)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FormPassword;
