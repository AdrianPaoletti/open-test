import React, { useState } from "react";
import { FormInputsModel } from "../../core/models/FormInputsModel";
import WizardContext from "./WizardContext";

interface WizardContextProviderProps {
  children: JSX.Element;
}

const WizardContextProvider = ({ children }: WizardContextProviderProps) => {
  const [stepperCount, setStepperCount] = useState<number>(1);
  const [statusCode, setStatusCode] = useState<number>(0);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formInputsValue, setFormInputsValue] = useState<FormInputsModel>({
    createPassword: "",
    repeatPassword: "",
    passwordClue: "",
  });

  return (
    <WizardContext.Provider
      value={{
        stepperCount,
        setStepperCount,
        isDisable,
        setIsDisable,
        formInputsValue,
        setFormInputsValue,
        isLoading,
        setIsLoading,
        statusCode,
        setStatusCode,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export default WizardContextProvider;
