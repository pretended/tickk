import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://myprojectname-11651.firebaseio.com/'
});

export default instance;
