import axios from "axios";
import useSWR from "swr";
import { ITour, ITourResponse } from "./connectiontypes";
import { fetcher } from "./fetcher";

const TRANSFER_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/transfer/listTransfer`; 
const TRANSFER_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/transfer/updateTransfer`; 
const TRANSFER_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/transfer/addTransfer`; 


export const listTransfer = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TRANSFER_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  
  export const postAddTransfer = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TRANSFER_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const postUpdateTransfer = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TRANSFER_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  