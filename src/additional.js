import axios from 'axios';
import { createMarkup } from './markup';

KEY_PIXABAY = '39344748-f22e888d108fa6b6315bee374';
BASE_URL = 'https://pixabay.com/api/';

function getUserRequest(userRequest, numberPage) {
  const searchParams = new URLSearchParams({
    key: KEY_PIXABAY,
    q: userRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: numberPage,
  });
  const option = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  const getData = async () => {
    const response = await axios.get(`${BASE_URL}?${searchParams}`, option);
    // console.log(response.data);
    return response;
  };
  return getData();
}

export { getUserRequest };
