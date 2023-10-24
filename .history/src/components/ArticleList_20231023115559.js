import React, { useEffect, useState } from "react";
import { getArticles, updateArticle } from "../services/api"; // Importujte aj funkciu na aktualizáciu článku

function ArticleList({ categoryId, page }) {
  const [articles, setArticles] = useState([]);
  const [updatedData, setUpdatedData] = useState({}); // Definujte premennú updatedData

  // Funkcia na načítanie článkov z API
  const loadArticles = async () => {
    try {
      const perPage = 10; // Nastavte počet článkov na stránku podľa vašich potrieb
      const data = await getArticles(perPage, categoryId, page);
      const articlesArray = Array.isArray(data) ? data : [];
      setArticles(articlesArray);
    } catch (error) {
      console.error("Chyba při načítání článků:", error);
    }
  };

  useEffect(() => {
    loadArticles(); // Zavoláme načítanie článkov pri zmene categoryId alebo page
  }, [categoryId, page]);

  // Funkcia na aktualizáciu článku
  const handleUpdateArticle = async (articleId) => {
    try {
      await updateArticle(articleId, updatedData);
      // Aktualizovať zoznam článkov po úspešnej aktualizácii
      loadArticles();
    } catch (error) {
      console.error("Chyba pri aktualizácii článku:", error);
    }
  };

  return (
    <div>
      <h2>Seznam článků</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.perex}</p>
            <button onClick={() => handleUpdateArticle(article.id)}>
              Aktualizovať článok
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
