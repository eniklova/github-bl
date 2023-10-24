// ArticleForm.js
import React, { useState } from "react";
import { createArticle, syncArticleWithCategories } from "../services/api";

function ArticleForm() {
  const initialFormData = {
    title: "",
    perex: "",
    content: "",
    author: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      const createdArticle = await createArticle(formData);
      setSubmitMessage("Článek byl úspěšně odeslán!");
      setIsSubmitted(true);
      setFormData({ ...initialFormData });

      // Synchronizace článku s konkrétními kategoriemi
      const articleId = createdArticle.id;
      const categoryIds = [1, 2, 3]; // Změňte podle vašich potřeb
      await syncArticleWithCategories(articleId, categoryIds);
    } catch (error) {
      console.error("Chyba při vytváření článku:", error);
      setSubmitMessage("Chyba při odesílání článku");
    }
  }

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

        {isSubmitted ? null : (
          <button type="submit">Odeslat článek</button>
        )}
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;