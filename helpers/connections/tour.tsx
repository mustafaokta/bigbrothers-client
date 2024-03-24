import axios from "axios";
import useSWR from "swr";
import { ITour, ITourResponse } from "./connectiontypes";
import { fetcher } from "./fetcher";

const TOUR_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/addTour`;
const TOUR_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/updateTour`;
const TOUR_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/list`;
const TOUR_LIST_SWR = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/listSwr`;

const TOUR_RESERVATION_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/addTourReservation`;
const TOUR_RESERVATOIN_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/updateTourReservation`;
const TOUR_RESERVATION_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/listTourReservation`;

const TOUR_ATV_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/addAtvTour`;
const TOUR_ATV_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/listAtvReservation`;
const UPDATE_ATV_TOUR = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/updateAtvTour`;

const TOUR_TYPE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/type`;
const TOUR_REGIONS = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/regions`;
const TOUR_AGENCY = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/agencies`;
const TOUR_HOTELS_SWR = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/hotels`;
const TOUR_VEHICLES_SWR = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/vehicles`;
const TOUR_DRIVERS_SWR = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/drivers`;
const PAYMENT_METHODS = `${process.env.NEXT_PUBLIC_API_HOST}/v1/tour/paymentMethods`;
const USER_ROLES_SWR = `${process.env.NEXT_PUBLIC_API_HOST}/v1/user/roles`;



/* Tour List */
export const postAddTour = (postData: { tour:  any }, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(TOUR_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
export const postUpdateTour = (postData: { tour:  ITour }, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(TOUR_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

  export const listTour = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };


export const useDataPaymentMethods = () => {
	const { data, error, isLoading } = useSWR<any>(PAYMENT_METHODS, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };
export const useDataHotelList = () => {
	const { data, error, isLoading } = useSWR<any>(TOUR_HOTELS_SWR, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };
export const useDataVehicleList = () => {
	const { data, error, isLoading } = useSWR<any>(TOUR_VEHICLES_SWR, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };
export const useDataDriverList = () => {
	const { data, error, isLoading } = useSWR<any>(TOUR_DRIVERS_SWR, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };
export const useDataUserRoleList = () => {
	const { data, error, isLoading } = useSWR<any>(USER_ROLES_SWR, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };
  export const useDataTourList = () => {
	const { data, error, isLoading } = useSWR<any>(TOUR_LIST_SWR, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };

/*  Tour Reservations */
export const postAddTourReservation = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_RESERVATION_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };


export const postAddAtv = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_ATV_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

export const listAtvReservation = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_ATV_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

export const updateAtvTour = (postData: { tour:  ITour }, token: string) => {
return new Promise((resolve, reject) => {
  axios
.post(UPDATE_ATV_TOUR, postData, { headers: { Authorization: `Bearer ${token}` } })
.then((res) => resolve(res.data))
.catch((err) => reject(err));
});
  };
export const postUpdateTourReservation = (postData: { tour:  ITour }, token: string) => {
return new Promise((resolve, reject) => {
  axios
.post(TOUR_RESERVATOIN_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
.then((res) => resolve(res.data))
.catch((err) => reject(err));
});
  };


  export const listTourReservation = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_RESERVATION_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };






export const useDataTourType = () => {
	const { data, error, isLoading } = useSWR<any>(TOUR_TYPE, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };
export const useDataRegions = () => {
	const { data, error, isLoading } = useSWR<any>(TOUR_REGIONS, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };

export const useDataAgency = () => {
	const { data, error, isLoading } = useSWR<any>(TOUR_AGENCY, fetcher, {
	  revalidateOnFocus: false,
	});
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  }


