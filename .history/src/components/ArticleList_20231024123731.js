import React, { useState, useEffect } from "react";
import { getArticles, updateArticleCategories } from "../services/api";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getArticles(10, 1, 1); // Změňte parametry podle vašich potřeb
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Chyba při načítání článků:", error);
      }
    }

    fetchArticles();
  }, []);

  const handleUpdateCategories = async () => {
    if (selectedArticleId && selectedCategoryIds.length > 0) {
      try {
        await updateArticleCategories(selectedArticleId, { category_ids: selectedCategoryIds });
        setUpdateMessage("Kategorie článku byly úspěšně aktualizovány.");
      } catch (error) {
        console.error("Chyba při aktualizaci kategorií článku:", error);
        setUpdateMessage("Chyba při aktualizaci kategorií článku");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Seznam článků</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.perex}</p>
            <p>Autor: {article.author}</p>
            <button onClick={() => setSelectedArticleId(article.id)}>Vybrat článek</button>
          </li>
        ))}
      </ul>

      {selectedArticleId && (
        <div>
          <h2>Upravit kategorie pro vybraný článek</h2>
          <div>
            <label>Vybrané kategorie:</label>
            <select
              multiple
              value={selectedCategoryIds}
              onChange={(e) => setSelectedCategoryIds(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
              <option value="1">Kategorie 1</option>
              <option value="2">Kategorie 2</option>
              <option value="3">Kategorie 3</option>
            </select>
          </div>
          <button onClick={handleUpdateCategories}>Aktualizovat kategorie</button>
          {updateMessage && <p>{updateMessage}</p>}
        </div>
      )}
    </div>
  );
}

export default ArticleList;
