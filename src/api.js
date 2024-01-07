import axios from 'axios';

const KEY = '40669349-8b3833151bb6b3e237d7939fc';
const pageLimit = 12;
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const requestImages = async (qyery, page) => {
  const { data } = await axios({
    params: {
      key: KEY,
      q: qyery,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageLimit,
    },
  });
  return data;
};