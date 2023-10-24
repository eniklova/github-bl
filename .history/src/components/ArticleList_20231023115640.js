// ArticleList.js
import React, { useEffect, useState } from "react";
import { getArticles } from "../services/api";

function ArticleList({ categoryId, page }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const perPage = 10; // Nastavte počet článkov na stránku podľa vašich potrieb

    getArticles(perPage, categoryId, page)
      .then((data) => {
        const articlesArray = Array.isArray(data) ? data : [];
        setArticles(articlesArray);
      })
      .catch((error) => {
        console.error("Chyba při načítání článků:", error);
      });
  }, [categoryId, page]);

  return (
    <div>
      <h2>Seznam článků</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.perex}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
