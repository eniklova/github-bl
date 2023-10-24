// ArticleList.js
import React, { useEffect, useState } from "react";
import { getArticles } from "../services/api";
import { mapArticleToCategories } from "../services/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const perPage = 10;
    const categoryId = 1;
    const page = 1;

    getArticles(perPage, categoryId, page)
      .then((data) => {
        const articlesArray = Array.isArray(data) ? data : [];
        setArticles(articlesArray);
      })
      .catch((error) => {
        console.error("Chyba při načítání článků:", error);
      });
  }, []);

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