import axios from "axios";

export const fetcher = async (url: string, token: string) => {
  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};
