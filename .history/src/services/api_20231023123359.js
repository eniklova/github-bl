import axios from "axios";

const BASE_URL = "https://test-api-79d35.ondigitalocean.app/article";

/**
 * Funkce pro získání seznamu článků.
 *
 * @param {number} perPage - Počet článků na stránku.
 * @param {number} categoryId - ID kategorie článků.
 * @param {number} page - Číslo stránky.
 * @returns {Promise} - Vrací data získaná z API.
 */
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

/**
 * Funkce pro vytvoření nového článku.
 *
 * @param {object} articleData - Data nového článku.
 * @returns {Promise} - Vrací data vytvořeného článku z API.
 */
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
    console.error("Chyba při vytváření článku:", error);
    throw error;
  }
};

/**
 * Funkce pro aktualizaci existujícího článku.
 *
 * @param {number} articleId - ID článku.
 * @param {object} updatedData - Aktualizovaná data článku.
 * @returns {Promise} - Vrací data aktualizovaného článku z API.
 */
export const updateArticle = async (articleId, updatedData) => {
  const URL = `${BASE_URL}/${articleId}`;

  try {
    updatedData.category_id = 1;
    const response = await axios.put(URL, updatedData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba při úpravě článku:", error);
    throw error;
  }
};

/**
 * Funkce pro aktualizaci kategorie článku.
 *
 * @param {number} articleId - ID článku.
 * @param {array} categoryIds - Pole ID kategorií.
 * @returns {Promise} - Vrací data aktualizace kategorie článku z API.
 */
export const updateArticleCategory = async (articleId, categoryIds) => {
  const URL = `${BASE_URL}/article/${articleId}/category-sync`;

  try {
    const response = await axios.put(URL, { category_ids: categoryIds }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Chyba při aktualizaci kategorie článku:", error);
    throw error;
  }
};

/**
 * Funkce pro smazání článku.
 *
 * @param {number} articleId - ID článku k odstranění.
 * @returns {Promise} - Neprovádí návratovou hodnotu, ale obsahuje ošetření chyb.
 */
export const deleteArticle = async (articleId) => {
  const URL = `${BASE_URL}/${articleId}`;

  try {
    await axios.delete(URL);
  } catch (error) {
    console.error("Chyba při mazání článku:", error);
    throw error;
  }
};

