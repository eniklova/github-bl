import React, { useState } from "react";
import { createArticle, updateArticleCategory } from "../services/api"; // Importujte aj funkciu na aktualizáciu kategórie

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
        // Vytváranie nového článku
        const createdArticle = await createArticle(formData);
        
        // Aktualizovanie kategórie článku pomocou aktualizačnej funkcie
        const categoryIds = [1, 2, 3]; // Aktualizujte podľa vašich potrieb
        await updateArticleCategory(createdArticle.id, categoryIds);

        setSubmitMessage("Článok bol úspešne odoslaný!");
        setValidationErrors({});
        setFormData({ ...initialFormData });
      } catch (error) {
        console.error("Chyba pri vytváraní článku:", error);
        setSubmitMessage("Chyba pri odosielaní článku");
      }
    } else {
      // Zobrazenie chybových správ v prípade neplatných dát
      setValidationErrors(errors);
    }
  }

  const validateFormData = (data) => {
    const errors = {};

    if (!data.title) {
      errors.title = "Názov článku je povinný.";
    } else if (data.title.length > 255) {
      errors.title = "Názov článku nesmie byť dlhší ako 255 znakov.";
    }

    if (!data.perex) {
      errors.perex = "Perex článku je povinný.";
    } else if (data.perex.length > 255) {
      errors.perex = "Perex článku nesmie byť dlhší ako 255 znakov.";
    }

    if (!data.author) {
      errors.author = "Autor článku je povinný.";
    } else if (data.author.length > 255) {
      errors.author = "Autor článku nesmie byť dlhší ako 255 znakov..";
    }

    return errors;
  };

  return (
    <div>
      <h2>Vytvořit nový článek</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (rovnaký kód na zobrazenie a validáciu) */}
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
