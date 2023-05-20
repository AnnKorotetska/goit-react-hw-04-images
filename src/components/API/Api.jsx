import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
axios.defaults.params = {
  key: '34809921-a63c416ab49de415c2d2110de',
  per_page: 12,
};

const Api = (value, page = 1) => {
  return axios.get('api/', { params: { q: value, page } }).then(data => data);
};

export default Api;
