import axios from "axios";
import useSWR from "swr";
import { ITour, ITourResponse } from "./connectiontypes";
import { fetcher } from "./fetcher";



const TOUR_TYPE_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listTypes`;
const TOUR_TYPE_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updateTourTypes`;
const TOUR_TYPE_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addTourTypes`;
const TOUR_TYPE_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/deleteTourTypes`;

const AGENCY_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listAgency`;
const AGENCY_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updateAgency`;
const AGENCY_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addAgency`;
const AGENCY_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/deleteAgency`;

const HOTEL_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listHotel`;
const HOTEL_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updateHotel`;
const HOTEL_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addHotel`;
const HOTEL_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/deleteHotel`;

const USER_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listUsers`;
const USER_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/deleteUsers`;
const USER_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addUsers`;
const USER_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updateUsers`;

const PAYMENTS_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listPayments`;
const PAYMENTS_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/deletePayments`;
const PAYMENTS_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addPayments`;
const PAYMENTS_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updatePayments`;
const PAYMENTS_UPDATE_STATUS = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updatePaymentStatus`;

const DRIVER_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listDrivers`;
const ADD_DRIVER = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addDrivers`;
const UPDATE_DRIVER = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updateDrivers`;

const VEHICLE_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listVehicle`;
const VEHICLE_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updateVehicle`;
const VEHICLE_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addVehicle`;
const VEHICLE_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/deleteVehicle`;

const REGION_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/listRegion`;
const REGION_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/updateRegion`;
const REGION_ADD = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/addRegion`;
const REGION_DELETE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/admin/deleteRegion`;


const TICKET_GENERATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/ticket/`;





/* Admin */

   /* Tour Types */
  export const addTourTypes = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_TYPE_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const updateTourTypes = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_TYPE_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const deleteTourTypes = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_TYPE_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const listTourTypes = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(TOUR_TYPE_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  
  
  
export const ticketGenerate = (params: { data:  any }) => {
	return new Promise((resolve, reject) => {
		axios
			.get(TICKET_GENERATE, {params: params.data} )
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};


   /* Agencies */
  export const addAgency= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(AGENCY_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const updateAgency= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(AGENCY_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const deleteAgency = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(AGENCY_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const listAgency= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(AGENCY_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };



   /* Hotels */
  export const addHotel= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(HOTEL_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const updateHotel= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(HOTEL_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const deleteHotel = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(HOTEL_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const listHotel= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(HOTEL_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

    // Users
	export const listUsers= (postData: { data:  any }, token: string) => {
		return new Promise((resolve, reject) => {
		  axios
			.post(USER_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
		});
	  };
	export const deleteUsers= (postData: { data:  any }, token: string) => {
		return new Promise((resolve, reject) => {
		  axios
			.post(USER_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
		});
	  };

	export const addUsers= (postData: { data:  any }, token: string) => {
			return new Promise((resolve, reject) => {
			axios
				.post(USER_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => resolve(res.data))
				.catch((err) => reject(err));
			});
		};

		export const updateUsers= (postData: { data:  any }, token: string) => {
			return new Promise((resolve, reject) => {
			axios
				.post(USER_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => resolve(res.data))
				.catch((err) => reject(err));
			});
		};
		
		// PAYMENTS
		export const listPayments= (postData: { data:  any }, token: string) => {
			return new Promise((resolve, reject) => {
			  axios
				.post(PAYMENTS_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => resolve(res.data))
				.catch((err) => reject(err));
			});
		  };
		  export const deletePayments= (postData: { data:  any }, token: string) => {
			return new Promise((resolve, reject) => {
			  axios
				.post(PAYMENTS_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => resolve(res.data))
				.catch((err) => reject(err));
			});
		  };
	
		export const addPayments= (postData: { data:  any }, token: string) => {
				return new Promise((resolve, reject) => {
				axios
					.post(PAYMENTS_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
					.then((res) => resolve(res.data))
					.catch((err) => reject(err));
				});
			};
	
			export const updatePayments= (postData: { data:  any }, token: string) => {
				return new Promise((resolve, reject) => {
				axios
					.post(PAYMENTS_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
					.then((res) => resolve(res.data))
					.catch((err) => reject(err));
				});
			};
			export const updatePaymentStatus= (postData: { data:  any }, token: string) => {
				return new Promise((resolve, reject) => {
				axios
					.post(PAYMENTS_UPDATE_STATUS, postData, { headers: { Authorization: `Bearer ${token}` } })
					.then((res) => resolve(res.data))
					.catch((err) => reject(err));
				});
			};


   /* Vehicle */
  export const addVehicle= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(VEHICLE_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const updateVehicle= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(VEHICLE_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const deleteVehicle = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(VEHICLE_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const listVehicle= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(VEHICLE_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
   /* Regions */
  export const addRegion= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(REGION_ADD, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const updateRegion= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(REGION_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const deleteRegion = (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(REGION_DELETE, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
  export const listRegion= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(REGION_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

 export const listDrivers= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(DRIVER_LIST, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

  export const addDrivers= (postData: any, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(ADD_DRIVER, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };

  export const updateDrivers= (postData: { data:  any }, token: string) => {
	return new Promise((resolve, reject) => {
	  axios
		.post(UPDATE_DRIVER, postData, { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => resolve(res.data))
		.catch((err) => reject(err));
	});
  };
