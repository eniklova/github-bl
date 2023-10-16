import React, { useState } from "react";
import { createArticle } from "../services/api";

function ArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    perex: "",
    content: "",
    author: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zobrazíme data z formularu v konzole
    console.log("Dáta z formulára:", formData);

    try {
      await createArticle(formData);
      setSubmitMessage("Článek bol úspěšně odeslán!");
      // Můžete provést další akce, například přesměrování
    } catch (error) {
      console.error("Chyba při vytváření článku:", error);
      setSubmitMessage("Chyba při odesílání článku");
    }
  };

  return (
    <div>
      <h2>Vytvoriť nový článoek</h2>
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

        <button type="submit">Odoslať článok</button>
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
