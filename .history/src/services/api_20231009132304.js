export const getArticles = async () => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
};