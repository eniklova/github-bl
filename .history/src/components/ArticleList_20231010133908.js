import React, { useEffect, useState } from "react";
import { getArticles } from "../services/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const perPage = null; 
    const categoryId = null; 
    const page = null; 

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