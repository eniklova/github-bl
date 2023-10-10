import axios from "axios";

const BASE_URL = "https://test-api-79d35.ondigitalocean.app/";

export const getArticles = async (perPage, categoryId, page) => {
  const URL = `${BASE_URL}/article?per_page=${perPage}&category_id=${categoryId}&page=${page}`;
  try {
    const response = await axios.get(URL, {
      params: {
        per_page: perPage,
        category_id: categoryId,
        page: page,
      },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Pouze hlavička Accept pro GET
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba pri získavaní článkov:", error);
    throw error;
  }
};

export const createArticle = async (articleData) => {
  const URL = `${BASE_URL}/article`;
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
  const URL = `${BASE_URL}/article/6`;
  try {
    const response = await axios.put(`${URL}/${articleId}`, updatedData, {
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
  const URL = `${BASE_URL}/articlearticle/2`;
  try {
    await axios.delete(`${URL}/${articleId}`);
  } catch (error) {
    console.error("Chyba pri mazaní článku:", error);
    throw error;
  }
};
