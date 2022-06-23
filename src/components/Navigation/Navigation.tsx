import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { submitForm } from "../../services/api";
import WizardContext from "../../store/context/WizardContext";
import "./Navigation.scss";

const Navigation = () => {
  const {
    isDisable,
    stepperCount,
    setStepperCount,
    formInputsValue,
    setIsLoading,
    setStatusCode,
  } = useContext(WizardContext);
  const { t } = useTranslation(["forms"]);

  const handleSubmitForm = async (
    password: string,
    repetaPassword: string,
    passwordClue: string
  ) => {
    setIsLoading(true);
    const statusCode = await submitForm(
      password,
      repetaPassword,
      passwordClue
    ).catch((error) => {
      setStatusCode(error.status);
      setIsLoading(false);
    });
    if (statusCode) {
      setStatusCode(statusCode.status);
      setIsLoading(false);
    }
  };

  return (
    <div className="navigation">
      <button
        className="navigation__button navigation__button--cancel"
        onClick={() => {
          setStepperCount(1);
        }}
        disabled={stepperCount === 1}
      >
        {t("forms:cancel")}
      </button>
      <button
        className="navigation__button navigation__button--next"
        onClick={() => {
          setStepperCount((prevStepperCount: number) => prevStepperCount + 1);
          stepperCount === 2 &&
            handleSubmitForm(
              formInputsValue.createPassword,
              formInputsValue.repeatPassword,
              formInputsValue.passwordClue
            );
        }}
        disabled={isDisable}
      >
        {t("forms:next")}
        <i className="fa fa-angle-right" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Navigation;
