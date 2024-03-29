import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_PROTOCOL_HOSTNAME_PORT } from "./utils/utils";
function HelloWorld() {
  const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios.post('http://localhost:8000/api/token/', {
  //     username: 'admin',
  //     password: 'admin123'  
  //   })
  //     .then(response => {
  //       setMessage(response.data.access);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    axios.get(API_PROTOCOL_HOSTNAME_PORT + "/api/hello-world/")
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;