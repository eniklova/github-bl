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
    console.error("Error getting articles:", error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  const URL = `${BASE_URL}`;

  try {
    articleData.category_id = 1;
    const response = await axios.post(URL, articleData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating the article:", error);
    throw error;
  }
};

export const syncArticleWithCategories = async (articleId, categoryIds) => {
  const URL = `${BASE_URL}/article/${articleId}/category-sync`;
  const data = { category_ids: categoryIds };

  try {
    const response = await axios.put(URL, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error syncing article with categories:", error);
    throw error;
  }
};
