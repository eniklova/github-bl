import React, { useEffect, useState } from "react";
import { getArticles } from "../services/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Získajte zoznam článkov z API pri načítaní komponenty
    getArticles().then((data) => {
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
