import axios from "axios";

const REGISTER = `${process.env.NEXT_PUBLIC_API_HOST}/v1/auth/register`;
const LOGIN = `${process.env.NEXT_PUBLIC_API_HOST}/v1/auth/login`;

export const postLogin = (postData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(LOGIN, postData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const registerUser = (postData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(REGISTER, postData)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
