import React, { useContext } from "react";
import "./App.scss";
import WizardContext from "./store/context/WizardContext";
import ProductInformation from "./views/ProductInformation/ProductInformation";
import Navigation from "./components/Navigation/Navigation";
import Form from "./views/Form/Form";
import Feedback from "./views/Feedback/Feedback";
import Stepper from "./components/Stepper/Stepper";
import { useTranslation } from "react-i18next";

function App() {
  const { stepperCount } = useContext(WizardContext);
  const { t, i18n } = useTranslation(["regions", "forms"]);
  return (
    <div className="App">
      <main className="App__content">
        <Stepper />
        <div className="steps-container">
          <div className="steps-container__select-container">
            <h1 className="steps-container__title">
              <span>{t("forms:create_abbr")}</span>
              {t("forms:create_password_manager")}
            </h1>
            <select
              name="select"
              value={i18n.language}
              onChange={(event) => {
                i18n.changeLanguage(event.target.value);
              }}
            >
              <option value="es">{t("regions:es")}</option>
              <option value="en">{t("regions:en")}</option>
            </select>
          </div>
          {stepperCount === 1 && <ProductInformation />}
          {stepperCount === 2 && <Form />}
          {stepperCount === 3 && <Feedback />}
        </div>
        {stepperCount !== 3 && <Navigation />}
      </main>
    </div>
  );
}

export default App;
