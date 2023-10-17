import React, { useEffect, useState } from "react";
import { getArticles } from "../services/api";

function ArticleAllList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const perPage = 10; // Počet článkov na stránku
    const categoryId = 1; // ID kategorie
    const page = 1; // Číslo stránky

    getArticles(perPage, categoryId, page)
      .then((data) => {
        const articlesArray = Array.isArray(data) ? data : [];
        setArticles(articlesArray);
      })
      .catch((error) => {
        console.error("Chyba pri načítaní článku:", error);
      });
  }, []);

  return (
    <div>
      <h2>Zoznam článkov</h2>
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

export default ArticleAllList;
