import axios from 'axios';
const address = 'http://localhost:6663';

const post = async (api, json) => {
    const { data } = await axios.post(`${address}${api}`, json);
    return data;
};

const exports = {
    post,
};

export default exports;
