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

    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const createdArticle = await createArticle(formData);

        if (createdArticle) {
          // Získání ID vytvořeného článku
          const articleId = createdArticle.id;

          // Přiřazení kategorií k článku
          const categoryIds = [1, 2, 3]; // Zde můžete dynamicky získat ID kategorií
          await assignArticleToCategories(articleId, categoryIds);

          setSubmitMessage("Článek byl úspěšně vytvořen a přiřazen kategoriím.");
          setValidationErrors({});
          setFormData({ ...initialFormData });
        }
      } catch (error) {
        console.error("Chyba při vytváření článku:", error);
        setSubmitMessage("Chyba při vytváření článku");
      }
    } else {
      setValidationErrors(errors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    // Validace dat formuláře
    // Příklad validace názvu článku
    if (!data.title) {
      errors.title = "Název článku je povinný.";
    } else if (data.title.length > 255) {
      errors.title = "Název článku nesmí být delší než 255 znaků.";
    }

    return errors;
  };

  // Funkce pro přiřazení kategorií k článku
  const assignArticleToCategories = async (articleId, categoryIds) => {
    try {
      const response = await fetch(`/article/${articleId}/category-sync`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ category_ids: categoryIds }),
      });

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Chyba při přiřazení kategorií: ${response.status}`);
      }
    } catch (error) {
      throw error;
    }
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
          {validationErrors.title && <p style={{ color: "red" }}>{validationErrors.title}</p>}
        </div>
        {/* Další pole formuláře */}
        <button type="submit">Odeslat článek</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
