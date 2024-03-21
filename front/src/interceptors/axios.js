import axios from "axios";
let refresh = false;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (!refresh) {  // error.response.status === 401 && 
      refresh = true;
      console.log(localStorage.getItem("refresh_token"));
      const response = await axios.post(
        process.env.REACT_APP_PROTOCOL_HOSTNAME_PORT + "/api/token/refresh/",
        { refresh: localStorage.getItem("refresh_token") },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] = `Bearer 
      ${response.data["access"]}`;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return axios(error.config);
      }
    
    }
    refresh = false;
    return error;
  }
);


fetch(process.env.REACT_APP_PROTOCOL_HOSTNAME_PORT + "/api/token/refresh/", {
  method: "POST",
  body: JSON.stringify({
    refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNzQxODE0MSwiaWF0IjoxNzA3MzMxNzQxLCJqdGkiOiI5NDQyNzgxMzkxNjQ0M2M5YTBmMGUxNWQwZmEwMmRlNSIsInVzZXJfaWQiOjF9.7bHrW4Jo5ODfb3onEUz6wTPZsUOEYUXwrQ24EZyLH5U'
  }),
  headers: {
    "Content-type": "application/json;"
  }
});

fetch(process.env.REACT_APP_PROTOCOL_HOSTNAME_PORT + "/api/token/", {
  method: "POST",
  body: JSON.stringify({
    username: 'admin',
    password: 'admin123'  
  }),
  headers: {
    "Content-type": "application/json;"
  }
})