/* eslint-disable prettier/prettier */
import { API_LOGIN } from '../../src/utils/constant';

export function signInApi(user) {
  const url = `${API_LOGIN}/login`;
  const data = {
    method: 'POST',
    body:JSON.stringify({
      email: user.email,
      password:user.password,
    }),headers:{
      'Content-Type': 'application/json',
    },
  };
   return fetch(url, data)
   .then((response) =>{
    console.log(data)
    if (response.status === 200) {
      return response.json();
    }
      return { message: 'email or password is incorrect' };
  }).then((result) => {
    console.log(result)
      return result;
    }
  ).catch((error) => {
    console.log(error);
    });
}


