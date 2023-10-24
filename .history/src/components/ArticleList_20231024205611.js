import React, { useState, useEffect } from "react";
import { getArticles } from "../services/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Načtení seznamu článků po načtení komponenty
    async function fetchArticles() {
      try {
        const data = await getArticles(10, 1, 1); // Změňte parametry podle vašich potřeb
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Chyba pri načítaní článkov:", error);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Zoznam člnkov</h2>
      <ul>
        {articles && articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.perex}</p>
            <p>Autor: {article.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
