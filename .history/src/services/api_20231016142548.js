import axios from "axios";

const BASE_URL = "https://test-api-79d35.ondigitalocean.app/article";

export const getArticles = async (perPage, categoryId, page) => {
  const URL = `${BASE_URL}g?per_page=5&category_id=1&page=1`;
try {
  const response = await axios.get(URL, {
    params: {
      per_page: perPage,
      category_id: categoryId,
      page: page,
    },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
} catch (error) {
  console.error("Chyba pri získavaní článkov:", error);
  throw error;
}

};

export const createArticle = async (articleData) => {
  const URL = `${BASE_URL}`;

  try {
    const response = await axios.post(URL, articleData, {
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
  const URL = `${BASE_URL}/article/${articleId}`;

  try {
    const response = await axios.put(URL, updatedData, {
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
  const URL = `${BASE_URL}/article/${articleId}`;

  try {
    await axios.delete(URL);
  } catch (error) {
    console.error("Chyba pri mazaní článku:", error);
    throw error;
  }
};
