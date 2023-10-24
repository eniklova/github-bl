import React, { useState } from "react";
import { createArticle, updateArticleCategories } from "../services/api";

function ArticleForm() {
  const initialFormData = {
    title: "",
    perex: "",
    content: "",
    author: "",
    published_at: null,
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    // Zde implementujte logiku pro aktualizaci vybraných kategorií
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const createdArticle = await createArticle(formData);

        if (createdArticle && selectedCategories.length > 0) {
          const articleId = createdArticle.id;
          await updateArticleCategories(articleId, selectedCategories);
        }

        setSubmitMessage("Článek byl úspěšně vytvořen a přiřazen kategoriím.");
        setValidationErrors({});
        setFormData({ ...initialFormData });
        setSelectedCategories([]);
      } catch (error) {
        console.error("Chyba při vytváření článku:", error);
        setSubmitMessage("Chyba při vytváření článku");
      }
    } else {
      setValidationErrors(errors);
    }
  };

  const validateFormData = (data) => {
    // Validace dat formuláře
  };

  return (
    <div>
      <h2>Vytvořit nový článek</h2>
      <form onSubmit={handleSubmit}>
        {/* Zde můžete mít vstupní pole pro název, perex, obsah, autora a další prvky */}
        <div>
          <label htmlFor="category">Kategorie:</label>
          {/* Zde můžete mít vstupní pole pro výběr kategorií */}
          {/* Přidejte obsluhu události pro aktualizaci vybraných kategorií */}
        </div>
        <button type="submit">Odeslat článek</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
