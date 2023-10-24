import React, { useState, useEffect } from "react";
import { getArticles } from "../services/api";


function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    // Načtení seznamu článků
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

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    if (event.target.checked) {
      // Přidání kategorie do seznamu
      setCategoryIds([...categoryIds, categoryId]);
    } else {
      // Odebrání kategorie ze seznamu
      setCategoryIds(categoryIds.filter((id) => id !== categoryId));
    }
  };

  const handleSubmit = async (articleId) => {
    try {
      // Odeslání požadavku na mapování článku na kategorie pomocí metody PUT
      await mapArticleToCategories(articleId, { category_ids: categoryIds });
      setSubmitMessage("Článek byl úspěšně mapován na kategorie!");
    } catch (error) {
      console.error("Chyba při mapování článku na kategorie:", error);
      setSubmitMessage("Chyba při mapování článku na kategorie");
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
            <label>
              <input
                type="checkbox"
                value={article.id}
                checked={categoryIds.includes(article.id)}
                onChange={handleCategoryChange}
              />
              Mapovat článek na kategorie
            </label>
            <button onClick={() => handleSubmit(article.id)}>
              Mapovat článek na kategorie
            </button>
          </li>
        ))}
      </ul>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleList;
