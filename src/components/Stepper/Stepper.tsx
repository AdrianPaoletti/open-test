import React, { useContext } from "react";
import WizardContext from "../../store/context/WizardContext";
import "./Stepper.scss";
const Stepper = () => {
  const { stepperCount } = useContext(WizardContext);
  return (
    <div className="stepper">
      <div className="stepper__container">
        <div className="stepper__number-container">
          <div
            className={`stepper__number ${
              stepperCount === 1 && "stepper__number--active"
            } ${stepperCount !== 1 && "stepper__number--done"}`}
          >
            {stepperCount === 1 ? (
              "1"
            ) : (
              <i className="fa fa-xs fa-check" aria-hidden="true"></i>
            )}
          </div>
          {stepperCount === 1 && <div className="stepper__arrow"></div>}
        </div>
        <span
          className={`stepper__line ${
            stepperCount !== 1 && "stepper__line--done"
          }`}
        ></span>
        <div className="stepper__number-container">
          <div
            className={`stepper__number ${
              stepperCount === 2 && "stepper__number--active"
            } ${stepperCount > 2 && "stepper__number--done"}`}
          >
            {stepperCount <= 2 ? (
              "2"
            ) : (
              <i className="fa fa-xs fa-check" aria-hidden="true"></i>
            )}
          </div>
          {stepperCount === 2 && <div className="stepper__arrow"></div>}
        </div>
        <span
          className={`stepper__line ${
            stepperCount > 2 && "stepper__line--done"
          }`}
        ></span>
        <div className="stepper__number-container">
          <div
            className={`stepper__number ${
              stepperCount === 3 && "stepper__number--active"
            }`}
          >
            3
          </div>
          {stepperCount === 3 && <div className="stepper__arrow"></div>}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
