import React, { useState } from "react";
import { createArticle } from "../services/api";

function ArticleForm() {
  const initialFormData = {
    title: "",
    perex: "",
    content: "",
    author: "",
    published_at: null, // Přidáme pole pro datum publikace
  };
  const [formData, setFormData] = useState({ ...initialFormData });
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

    console.log("Data z formuláře:", formData);

    // Validace dat před odesláním na server
    if (validateFormData(formData)) {
      try {
        await createArticle(formData);
        setSubmitMessage("Článek byl úspěšně odeslán!");
        // Vymazání dat z formuláře po úspěšném odeslání
        setFormData({ ...initialFormData });
      } catch (error) {
        console.error("Chyba při vytváření článku:", error);
        setSubmitMessage("Chyba při odesílání článku");
      }
    } else {
      setSubmitMessage("Chyba: Neplatná data");
    }
  };

  // Funkce pro validaci dat
  const validateFormData = (data) => {
    if (
      data.title.length > 0 &&
      data.title.length <= 255 &&
      data.perex.length > 0 &&
      data.perex.length <= 255 &&
      data.author.length > 0 &&
      data.author.length <= 255
    ) {
      return true;
    }
    return false;
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
        <div>
          <label htmlFor="published_at">Datum publikace:</label>
          <input
            type="text"
            id="published_at"
            name="published_at"
            value={formData.published_at}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Odeslat článek</button>
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
