// ArticleForm.js
import React, { useState } from 'react';

function ArticleForm() {
  const [formData, setFormData] = useState({
    title: '',
    perex: '',
    content: '',
    author: '',
    published_at: '',
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

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await fetch('https://test-api-79d35.ondigitalocean.app/article', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Článok bol úspešne vytvorený');
      } else {
        console.error('Chyba pri vytváraní článku');
      }
    } catch (error) {
      console.error('Chyba pri komunikácii s API:', error);
    }
  };

  return (
    <div>
      <h2>Vytvoriť článok</h2>
      <form onSubmit={handleSubmit}>
        {/* Zde vložte formulářové prvky pro název, perex, obsah, autora a datum publikace */}
        {/* Například: */}
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
        {/* Další formulářové prvky */}
        {/* ... */}

        <div>
          <button type="submit">Vytvoriť článok</button>
        </div>
      </form>
    </div>
  );
}

export default ArticleForm;
