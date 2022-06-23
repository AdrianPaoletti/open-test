import { createContext } from "react";
import { FormInputsModel } from "../../core/models/FormInputsModel";

interface WizardCreateContext {
  stepperCount: number;
  setStepperCount: React.Dispatch<React.SetStateAction<number>>;
  isDisable: boolean;
  setIsDisable: React.Dispatch<React.SetStateAction<boolean>>;
  formInputsValue: FormInputsModel;
  setFormInputsValue: React.Dispatch<React.SetStateAction<FormInputsModel>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  statusCode: number;
  setStatusCode: React.Dispatch<React.SetStateAction<number>>;
}

const WizardContext = createContext<WizardCreateContext | any>(
  {} as WizardCreateContext
);
WizardContext.displayName = "Wizard Context";

export default WizardContext;
