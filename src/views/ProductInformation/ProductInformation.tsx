import React, { useContext, useEffect } from "react";
import "./ProductInformation.scss";
import imageSourceGroup from "../../assets/images/group.svg";
import imageSourceGroup3 from "../../assets/images/group-3.svg";
import WizardContext from "../../store/context/WizardContext";
import { useTranslation } from "react-i18next";

const ProductInformation = () => {
  const { setIsDisable } = useContext(WizardContext);
  const { t } = useTranslation(["forms"]);
  useEffect(() => {
    setIsDisable(true);
  }, []);
  return (
    <div className="product-information">
      <div className="product-information__images">
        <div className="product-information__image">
          <img
            src={imageSourceGroup}
            width={150}
            height={150}
            alt="password memorization"
          />
          <p>{t("forms:save_here_all_password")}</p>
        </div>
        <div className="product-information__image">
          <img
            src={imageSourceGroup3}
            width={150}
            height={150}
            alt="password locker"
          />
          <p>{t("forms:password_master_secrets")}</p>
        </div>
      </div>
      <h3>{t("forms:how_it_works")}</h3>
      <p>{t("forms:how_it_works_text")}</p>
      <h3>{t("forms:which_data_to_save")}</h3>
      <p>{t("forms:which_data_to_save_text")}</p>

      <input
        type="checkbox"
        id="accept-age-politics"
        name="accept-age-politics"
        onChange={(event) => {
          setIsDisable(!event.target.checked);
        }}
      />
      <label htmlFor="accept-age-politics">
        {t("forms:age_politics_confirmation")}
      </label>
    </div>
  );
};

export default ProductInformation;
