// src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import { getArticles } from '../services/api'; // Zmeňte na správny import podľa vášho projektu

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Načítanie článkov z API po načítaní komponentu
    getArticles(5, 1, 1) // Parametre môžete upraviť podľa potreby
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Chyba pri načítavaní článkov:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Zoznam článkov</h1>
      {loading ? (
        <p>Načítavam články...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticleList;
