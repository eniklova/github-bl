import axios from "axios";

const API_URL = "https://test-api-79d35.ondigitalocean.app/article";
const API_URL1 = "https://test-api-79d35.ondigitalocean.app/article";

export const getArticles = async (perPage, categoryId, page) => {
  try {
    const response = await axios.get(API_URL1, {
      params: {
        per_page: perPage,
        category_id: categoryId,
        page: page,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní článkov:", error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  try {
    const response = await axios.post(API_URL, articleData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba pri vytváraní článku:", error);
    throw error;
  }
};

export const updateArticle = async (articleId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${articleId}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba pri úprave článku:", error);
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    await axios.delete(`${API_URL}/${articleId}`);
  } catch (error) {
    console.error("Chyba pri mazaní článku:", error);
    throw error;
  }
};
