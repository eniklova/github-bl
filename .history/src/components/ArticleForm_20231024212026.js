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
    const { value } = e.target;
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(value)) {
        return prevCategories.filter((category) => category !== value);
      } else {
        return [...prevCategories, value];
      }
    });
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
          {validationErrors.title && <p style={{ color: "red" }}>{validationErrors.title}</p>}
        </div>
        <div>
          <label htmlFor="category">Kategorie:</label>
          <select
            id="category"
            name="category"
            multiple
            onChange={handleCategoryChange}
          >
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
