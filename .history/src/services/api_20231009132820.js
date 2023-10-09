import axios from "axios";

const API_URL = "https://test-api-79d35.ondigitalocean.app/article"

  export const getArticles = async (perPage, categoryId, page) => {
    try {
      const response = await axios.get(API_URL, {
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