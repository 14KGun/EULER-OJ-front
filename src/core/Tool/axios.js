import _axios from 'axios';

const axios = _axios.create({ baseURL: 'https://euleroj.io', withCredentials: true });

export default axios;