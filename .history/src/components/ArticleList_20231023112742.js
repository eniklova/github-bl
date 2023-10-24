import React, { useEffect, useState } from "react";
import { getArticles, mapArticleToCategories } from "../services/api";

function ArticleList({ categoryId, articleId }) {
  const [articles, setArticles] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    // Načtení článků z určité kategorie
    const perPage = 10;
    const page = 1;

    getArticles(perPage, categoryId, page)
      .then((data) => {
        const articlesArray = Array.isArray(data) ? data : [];
        setArticles(articlesArray);
      })
      .catch((error) => {
        console.error("Chyba při načítání článků:", error);
      });

    // Načtení aktuálních kategorií spojených s článkem
    const fetchCurrentCategories = async () => {
      try {
        // Zde voláme službu pro získání aktuálních kategorií spojených s článkem
        const response = await getCategoriesForArticle(articleId);
        const currentCategoryIds = response.data.map((category) => category.id);
        setCategoryIds(currentCategoryIds);
      } catch (error) {
        console.error("Chyba při načítání kategorií:", error);
      }
    };

    fetchCurrentCategories();
  }, [categoryId, articleId]);

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

  const handleSubmit = async () => {
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
          </li>
        ))}
      </ul>

      <div>
        <h2>Mapovat článek na kategorie</h2>
        {categoryList.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              checked={categoryIds.includes(category.id)}
              onChange={handleCategoryChange}
            />
            {category.name}
          </label>
        ))}
        <button onClick={handleSubmit}>Mapovat článek na kategorie</button>
        {submitMessage && <p>{submitMessage}</p>}
      </div>
    </div>
  );
}

export default ArticleList;
