import React, { useState } from "react";
import { createArticle } from "../services/api";

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

    console.log("Dáta z formulára:", formData);

    try {
      await createArticle(formData);
      setSubmitMessage("Článok bol úspešne odoslaný!");
      setIsSubmitted(true);
      // Vymažeme data z formuláře po úspěšném odeslání
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Chyba pri vytváraní článku:", error);
      setSubmitMessage("Chyba pri odosielaní článku");
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

        {isSubmitted ? null : (
          <button type="submit">Odoslať článok</button>
        )}
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;