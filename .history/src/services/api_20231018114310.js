// Přidáno category_id jako parametr pro všechny metody, které vytvářejí články
export const createArticle = async (articleData) => {
  const URL = `${BASE_URL}`;

  try {
    // Přidáme category_id do articleData
    articleData.category_id = 1;
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
    // Přidáme category_id do updatedData
    updatedData.category_id = 1;
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
