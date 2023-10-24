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
  const [submitMessage, setSubmitMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [categoryIds, setCategoryIds] = useState([]); // Pole ID kategorií
  const [articleId, setArticleId] = useState(null); // ID nově vytvořeného článku

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateCategories = async () => {
    try {
      // Odešlete PUT požadavek na aktualizaci kategorií
      await updateArticleCategories(articleId, { category_ids: categoryIds });
      console.log("Kategorie článku byly úspěšně aktualizovány.");
    } catch (error) {
      console.error("Chyba při aktualizaci kategorií článku:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data z formuláře:", formData);

    const errors = validateFormData(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const createdArticle = await createArticle(formData);
        setSubmitMessage("Článek byl úspěšně vytvořen!");
        setValidationErrors({});
        setFormData({ ...initialFormData });

        // Uložení ID nově vytvořeného článku pro pozdější aktualizaci kategorií
        setArticleId(createdArticle.id);
      } catch (error) {
        console.error("Chyba při vytváření článku:", error);
        setSubmitMessage("Chyba při vytváření článku");
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

    // Další validace pro perex, content, author, a published_at

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

      {articleId && (
        <div>
          <h3>Právě vytvořený článek:</h3>
          <p>ID článku: {articleId}</p>
          <button onClick={handleUpdateCategories}>Aktualizovat kategorie</button>
        </div>
      )}
    </div>
  );
}

export default ArticleForm;