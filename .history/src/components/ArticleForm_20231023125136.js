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
        // Vytvoření článku
        const createdArticle = await createArticle(formData);
        
        // Získání ID vytvořeného článku
        const articleId = createdArticle.id;

        // Napárování článku s kategoriemi
        const categoryIds = [1, 2, 3]; // Zde můžete specifikovat ID kategorií
        await updateArticleCategories(articleId, categoryIds);

        setSubmitMessage("Článek byl úspěšně vytvořen a napárován s kategoriemi!");
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
  }

  return (
    <div>
      <h2>Vytvořit nový článek</h2>
      <form onSubmit={handleSubmit}>
        {/* Zde je formulář pro zadání informací o článku */}
      </form>
    </div>
  );
}

export default ArticleForm;
