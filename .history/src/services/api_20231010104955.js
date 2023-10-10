import axios from 'axios';

const apiUrl = 'https://test-api-79d35.ondigitalocean.app/article';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const params = {
  per_page: 5,
  category_id: 1,
  page: 1
};

axios.get(apiUrl, { headers, params })
  .then(response => {
    // Spracujte údaje z odpovede tu
    console.log(response.data); // Toto vypíše dáta získané z API
  })
  .catch(error => {
    // Spracovanie chyby, ak sa vyskytne
    console.error(error);
  });
