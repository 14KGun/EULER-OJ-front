import _axios from 'axios';

const axios = _axios.create({ baseURL: 'https://euleroj.io' });

export default axios;