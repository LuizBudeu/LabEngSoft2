import axios from "axios";

const my_axios = axios.create()

const access_token = 'asdf'

my_axios.interceptors.request.use(function (config) {
  config.headers = {...config.headers, Authorization: 'Bearer ' + access_token}
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default my_axios;