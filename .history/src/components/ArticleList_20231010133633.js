import React, { useEffect, useState } from "react";
import { getArticles } from "../services/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const perPage = null; // Počet článků na stránku (null nebo undefined pro všechny články)
    const categoryId = null; // ID kategorie (null nebo undefined pro žádný filtr)
    const page = null; // Stránka (null nebo undefined pro všechny stránky)

    getArticles(perPage, categoryId, page).then((data) => {
      setArticles(data);
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

export default ArticleList;
