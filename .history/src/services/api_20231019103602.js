// api.js
import axios from "axios";

const BASE_URL = "https://test-api-79d35.ondigitalocean.app/article";

export const getArticles = async (perPage, categoryId, page) => {
  const URL = `${BASE_URL}?per_page=${perPage}&category_id=${categoryId}&page=${page}`;

  try {
    const response = await axios.get(URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba při získávání článků:", error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  const URL = BASE_URL;

  if (!articleData.title || !articleData.perex || !articleData.content || !articleData.author) {
    throw new Error("Všechna pole jsou povinná.");
  }

  try {
    const response = await axios.post(URL, articleData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba při vytváření článku:", error);
    throw error;
  }
};

export const syncArticleWithCategories = async (articleId, categoryIds) => {
  const URL = `${BASE_URL}/article/${articleId}/category-sync`;

  try {
    const response = await axios.put(URL, { category_ids: categoryIds }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "applicationjson",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba při synchronizaci článku s kategoriemi:", error);
    throw error;
  }
};
