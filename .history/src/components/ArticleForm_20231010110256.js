// ArticleForm.js
import React, { useState } from "react";
import { createArticle } from "../services/api";

function ArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    perex: "",
    content: "",
    author: "",
    published_at: "",
  });

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
      // Volanie funkcie createArticle s údajmi z formulára
      await createArticle(formData);
      // Úspešne vytvorený článok, môžete vykonať nejakú akciu (napr. presmerovanie na zoznam článkov)
    } catch (error) {
      // Chyba pri vytváraní článku, môžete ju spracovať alebo zobraziť chybovú správu
      console.error("Chyba pri vytváraní článku:", error);
    }
  };

  return (
    <div>
      <h2>Vytvoriť nový článok</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Názov:</label>
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
        <div>
          <label htmlFor="published_at">Dátum publikácie:</label>
          <input
            type="datetime-local"
            id="published_at"
            name="published_at"
            value={formData.published_at}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Vytvoriť článok</button>
      </form>
    </div>
  );
}

export default ArticleForm;
