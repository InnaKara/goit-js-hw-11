import axios from 'axios';
import { createMarkup } from './markup';

// KEY_PIXABAY = '39368125-d1b3e5b97c15ed48cece9f7a0';
BASE_URL = 'https://pixabay.com/api/';

function getUserRequest(userRequest, numberPage) {
  const searchParams = new URLSearchParams({
    key: '39368125-d1b3e5b97c15ed48cece9f7a0',
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
