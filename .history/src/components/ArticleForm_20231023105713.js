import React, { useState } from "react";
import { createArticle } from "../services/api";

function ArticleForm() {
  const initialFormData = {
    title: "",
    perex: "",
    content: "",
    author: "",
    published_at: null,
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [submitMessage, setSubmitMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data z formuláře:", formData);

    // Validace dat před odesláním na server
    const errors = validateFormData(formData);
    const fieldsFilled = checkFieldsFilled(formData);

    if (Object.keys(errors).length === 0 && fieldsFilled) {
      try {
        await createArticle(formData);
        setSubmitMessage("Článek byl úspěšně odeslán!");
        setValidationErrors({});
        setFormData({ ...initialFormData });
      } catch (error) {
        console.error("Chyba při vytváření článku:", error);
        setSubmitMessage("Chyba při odesílání článku");
      }
    } else {
      setValidationErrors(errors);

      if (!fieldsFilled) {
        setSubmitMessage("Chyba: Všechna pole musí být vyplněna.");
      } else {
        setSubmitMessage("Chyba: Neplatná data.");
      }
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.title) {
      errors.title = "Název článku je povinný.";
    } else if (data.title.length > 255) {
      errors.title = "Název článku nesmí být delší než 255 znaků.";
    }

    if (!data.perex) {
      errors.perex = "Perex článku je povinný.";
    } else if (data.perex.length > 255) {
      errors.perex = "Perex článku nesmí být delší než 255 znaků.";
    }

    if (!data.author) {
      errors.author = "Autor článku je povinný.";
    } else if (data.author.length > 255) {
      errors.author = "Autor článku nesmí být delší než 255 znaků.";
    }

    return errors;
  };

  const checkFieldsFilled = (data) => {
    return (
      data.title.length > 0 &&
      data.perex.length > 0 &&
      data.author.length > 0 &&
      data.content.length > 0
    );
  };

  return (
    <div>
      <h2>Vytvořit nový článek</h2>
      <form onSubmit={handleSubmit}>
        {/* Vstupní pole pro název, perex, obsah, autora a datum publikace */}
        <button type="submit">Odeslat článek</button>
      </form>

      {Object.keys(validationErrors).map((fieldName) => (
        <p key={fieldName} style={{ color: "red" }}>
          {validationErrors[fieldName]}
        </p>
      ))}

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
