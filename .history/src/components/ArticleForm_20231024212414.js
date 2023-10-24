import React, { useState } from "react";
import { createArticle, assignArticleToCategories } from "../services/api";

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
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const createdArticle = await createArticle(formData);

        if (createdArticle && selectedCategories.length > 0) {
          const articleId = createdArticle.id;
          await assignArticleToCategories(articleId, selectedCategories);
        }

        setSubmitMessage("Článek byl úspěšně odeslán!");
        setValidationErrors({});
        setFormData({ ...initialFormData });
      } catch (error) {
        console.error("Chyba při vytváření článku:", error);
        setSubmitMessage("Chyba při odesílání článku");
      }
    } else {
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
          {validationErrors.author && (
            <p style={{ color: "red" }}>{validationErrors.author}</p>
          )}
        </div>

        {/* Pole pro výběr kategorií */}
        <div>
          <label>Vybrané kategorie:</label>
          <select
            multiple
            value={selectedCategories}
            onChange={(e) =>
              handleCategoryChange(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {/* Zde vložte možnosti kategorií na výběr */}
            <option value="1">Kategorie 1</option>
            <option value="2">Kategorie 2</option>
            <option value="3">Kategorie 3</option>
          </select>
        </div>

        <button type="submit">Odeslat článek</button>
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
