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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Dáta z formulára:", formData);

    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      try {
        await createArticle(formData);
        setSubmitMessage("Článok bol úspešne odoslaný!");
        setValidationErrors({});
        setFormData({ ...initialFormData });
      } catch (error) {
        console.error("Chyba pri vytvárení článku:", error);
        setSubmitMessage("Chyba při odesílání článku");
      }
    } else {
      // Zobrazení chybových zpráv v případě neplatných dat
      setValidationErrors(errors);
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

  return (
    <div>
      <h2>Vytvořit nový článek</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Název:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {/* Zobrazení chybové zprávy pro název článku */}
          {validationErrors.title && (
            <p style={{ color: "red" }}>{validationErrors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="perex">Perex:</label>
          <input
            type="text"
            id="perex"
            name="perex"
            value={formData.perex}
            onChange={handleChange}
          />
          {/* Zobrazení chybové zprávy pro perex článku */}
          {validationErrors.perex && (
            <p style={{ color: "red" }}>{validationErrors.perex}</p>
          )}
        </div>
        <div>
          <label htmlFor="content">Obsah:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          {/* Zobrazení chybové zprávy pro autora článku */}
          {validationErrors.author && (
            <p style={{ color: "red" }}>{validationErrors.author}</p>
          )}
        </div>

        <button type="submit">Odeslat článek</button>
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
