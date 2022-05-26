import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "key=26619525-aa9606919adbfa9adcea81a99";

async function fetchPicturesWithQuery(name, page) {
  const response = await axios.get(
    `${BASE_URL}?${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
  );
  return response.data;
}

export { fetchPicturesWithQuery };
