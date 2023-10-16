import React, { useState } from "react";
import { createArticle } from "../services/api";

function ArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    perex: "",
    content: "",
    author: "",
  });
  const [submitMessage, setSubmitMessage] = useState(""); // State pro zobrazení zprávy

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArticle(formData);
      setSubmitMessage("Článok bol odoslaný!");
       } catch (error) {
      console.error("Chyba pri vytváraní článku", error);
      setSubmitMessage("Chyba pri odesílání článku");
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
        </div>

        <button type="submit">Vytvořit článek</button>
      </form>

      {/* Zde zobrazíme zprávu o odeslání */}
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
