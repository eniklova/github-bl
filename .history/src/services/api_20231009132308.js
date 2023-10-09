import axios from "axios";

const API_URL = "https://test-api-79d35.ondigitalocean.app/article"

export const getArticles = async () => {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
  };