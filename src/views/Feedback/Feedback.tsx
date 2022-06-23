import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import successIconPath from "../../assets/images/success.svg";
import errorIconPath from "../../assets/images/warning.svg";
import WizardContext from "../../store/context/WizardContext";
import "./Feedback.scss";

interface AlertParams {
  iconPath: string;
  altText: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

const Feedback = () => {
  const { t } = useTranslation(["forms"]);
  const { isLoading, statusCode, setStepperCount } = useContext(WizardContext);
  const [alertParams, setAlertParams] = useState<AlertParams>({
    iconPath: successIconPath,
    altText: "success icon",
    title: "forms:password_manager_created",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et tempor erat.",
    buttonText: "forms:access",
  });

  const errorParams: AlertParams = {
    iconPath: errorIconPath,
    altText: "error icon",
    title: "forms:err_has_occured",
    subtitle: "forms:err_not_modified",
    buttonText: "forms:back_to",
  };

  useEffect(() => {
    if (statusCode === 401) setAlertParams(errorParams);
  }, [statusCode]);

  return (
    <div className="feedback">
      {isLoading ? (
        <div className="feedback__loading"></div>
      ) : (
        <div className="feedback__alert">
          <div className="feedback__information">
            <img
              src={alertParams.iconPath}
              alt={alertParams.altText}
              width={40}
            />
            <div className="feedback__text">
              <h3>{t(alertParams.title)}</h3>
              <p>{t(alertParams.subtitle)}</p>
            </div>
          </div>
          <div className="feedback__actions">
            <button
              onClick={
                statusCode === 401
                  ? () => setStepperCount(1)
                  : () => console.log("Acceso concedido!")
              }
            >
              {t(alertParams.buttonText)}{" "}
              <i className="fa fa-angle-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
