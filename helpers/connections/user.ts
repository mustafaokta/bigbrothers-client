import axios from "axios";
import useSWR from "swr";
import { fetcher } from "./fetcher";

const USER_ME = `${process.env.NEXT_PUBLIC_API_HOST}/v1/user/me`;
const USER_SEARCH = `${process.env.NEXT_PUBLIC_API_HOST}/v1/user/search`;
const USER_PROFILE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/user/profile`;
const USER_PROFILE_UPDATE = `${process.env.NEXT_PUBLIC_API_HOST}/v1/user/profile`;
const USER_PROFILE_PHOTO = `${process.env.NEXT_PUBLIC_API_HOST}/v1/user/photo`;

/* Yeniler */
const USER_LIST = `${process.env.NEXT_PUBLIC_API_HOST}/v1/user/list`;

interface UserMeResponse {
  success: boolean;
  status: number;
  content: {
    id: number;
    email: string;
    isActive: boolean;
    isBanned: boolean;
    UserDetail: {
      id: number;
      userId: number;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
    UserWallet: {
      id: number;
      userId: number;
      credit: number;
      createdAt: string;
      updatedAt: string;
    };
    friendsOne: {
      id: number;
      userOneId: number;
      userTwoId: number;
      status: number;
      userFrientTwo: {
        id: number;
        email: string;
        UserDetail: {
          name: string;
        };
      };
    }[];
    friendsTwo: {
      id: number;
      userOneId: number;
      userTwoId: number;
      status: number;
      userFrientOne: {
        id: number;
        email: string;
        UserDetail: {
          name: string;
        };
      };
    }[];
  };
}

interface UserSearchResponse {
  success: boolean;
  status: number;
  content: {
    id: number;
    UserDetail: {
      name: string;
    };
  }[];
}

export const useDataUserMe = (token: string) => {
  const { data, error, mutate } = useSWR<UserMeResponse>([USER_ME, token], fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useDataUserSingle = (profileId: string) => {
  const CREATED_URL = `${USER_PROFILE}/${profileId}`;
  const { data, error } = useSWR(CREATED_URL, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDataUserSearch = (search: string | null) => {
  //const CREATED_URL = `${USER_SEARCH}?searchString=${search}`;
  const CREATED_URL = `${USER_SEARCH}`;
  const { data, error } = useSWR<UserSearchResponse>([CREATED_URL], fetcher, {
    revalidateOnFocus: false,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

interface IUpdateUser {
  name: string;
}

export const postUpdateUser = (postData: IUpdateUser, token: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(USER_PROFILE_UPDATE, postData, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};


/* Yeniler */
export const useDataUserList = () => {
	const { data, error, isLoading } = useSWR<any>(USER_LIST, fetcher, {
	  revalidateOnFocus: false,
	});	
	return {
	  data: data,
	  isLoading: isLoading,
	  isError: error,
	};
  };
  export const postAddUserPhoto = (postData: any, token: string) => {
    return new Promise((resolve, reject) => {
      axios
        .post(USER_PROFILE_PHOTO, postData, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };