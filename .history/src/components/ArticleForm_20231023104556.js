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

    console.log("Data z formuláře:", formData);

    try {
      // Validace dat před odesláním na server
      if (validateFormData(formData)) {
        await createArticle(formData);
        setSubmitMessage("Článek byl úspěšně odeslán!");
        setIsSubmitted(true);
        // Vymazání dat z formuláře po úspěšném odeslání
        setFormData({ ...initialFormData });
      } else {
        setSubmitMessage("Chyba: Neplatná data");
      }
    } catch (error) {
      console.error("Chyba při vytváření článku:", error);
      setSubmitMessage("Chyba při odesílání článku");
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
        {/* ... vstupní pole pro název, perex, obsah, autora a datum publikace */}
        <button type="submit">Odeslat článek</button>
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
