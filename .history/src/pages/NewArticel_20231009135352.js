

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
      const response = await fetch('https://example.com/api/articles', {
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
          <label htmlFor="published_at">Publikované dňa:</label>
          <input
            type="text"
            id="published_at"
            name="published_at"
            value={formData.published_at}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Vytvoriť článok</button>
        </div>
      </form>
    </div>
  );
}

export default ArticleForm;
