import axios from "axios";
import { IPilot } from "./connectiontypes";
import useSWR from "swr";
import { fetcher } from "./fetcher";

const PILOT_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/addPilot`;
const MEDIA_PAYMENT_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/addMediaPayment`;
const PILOT_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/pilotList`;
const MEDIA_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/mediaList`;
const UPDATE_MEDİA_PAYMENT = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/updateMediaPayment`;

const PILOT_NAME_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/pilotNameList`;
const PARACHUTE_ENTRY= `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/parachuteEntry`;
const PARACHUTE_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/listParachuteEntry`;
const PARACHUTE_LIST_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/parachuteEntryUpdate`;
const PARACHUTE_LIST_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/parachuteEntryDelete`;
const UPDATE_PILOT = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/updatePilot`;
const DELETE_PILOT = `${process.env.NEXT_PUBLIC_API_HOST}/v1/paragliding/deletePilot`;


export const postAddPilot = (postData: { pilot:  any }, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(PILOT_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
export const postAddMediaPayment = (postData: { mediaPayment:  any }, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(MEDIA_PAYMENT_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
export const updateMediaPayment = (postData: { mediaPayment:  any }, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(UPDATE_MEDİA_PAYMENT, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
export const postPilotList = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(PILOT_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
export const postMediaList = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(MEDIA_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

  export const useDataPilotName = () => {
    const { data, error, isLoading } = useSWR<any>(PILOT_NAME_LIST, fetcher, {
      revalidateOnFocus: false,
    });
    return {
      data: data,
      isLoading: isLoading,
      isError: error,
    };
    }

export const postAddParachuteEntry = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(PARACHUTE_ENTRY, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

  export const listParachuteEntry = (postData: { data:  any }, token: string) => {
    return new Promise((resolve, reject) => {
      axios
      .post(PARACHUTE_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
    });
    };

export const parachuteEntryUpdate = (postData: { data:  any }, token: string) => {
    return new Promise((resolve, reject) => {
      axios
      .post(PARACHUTE_LIST_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
    });
    };
export const parachuteEntryDelete = (postData: { data:  any }, token: string) => {
    return new Promise((resolve, reject) => {
      axios
      .post(PARACHUTE_LIST_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
    });
    };

export const updatePilot = (postData: { data:  any }, token: string) => {
    return new Promise((resolve, reject) => {
      axios
      .post(UPDATE_PILOT, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
    });
    };

  export const deletePilot = (postData: { data:  any }, token: string) => {
    return new Promise((resolve, reject) => {
      axios
      .post(DELETE_PILOT, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
    });
    };