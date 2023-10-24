// api.js
import axios from "axios";

const BASE_URL = "https://test-api-79d35.ondigitalocean.app/article";

export const getArticles = async (perPage, categoryId, page) => {
  const URL = `${BASE_URL}?per_page=${perPage}&category_id=${categoryId}&page=${page}`;

  const response = await axios.get(URL);
  return response.data;
};

export const createArticle = async (articleData) => {
  const URL = BASE_URL;

  const response = await axios.post(URL, articleData);
  return response.data;
};

export const syncArticleWithCategories = async (articleId, categoryIds) => {
  const URL = `${BASE_URL}/article/${articleId}/category-sync`;

  const response = await axios.put(URL, { category_ids: categoryIds });
  return response.data;
};
