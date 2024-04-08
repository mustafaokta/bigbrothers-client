import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import  { JwtPayload, jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { postLogin } from "../helpers/connections/auth"; // connections/auth"
import showNotification from "../components/extras/showNotification";
import { fetchUserPhoto } from "../helpers/connections/user";


interface IUserContext {
  iat: number | undefined | null;
  exp: number | undefined | null;
  id: number | null;
  token: string | null;
  name: string| null;
  surname: string | null;
  src: string  | null;
  email: string | null;
  roleId: number | null;
}

interface IUserProvider {
  user: IUserContext;
  loginUser: (postData: { email: string; password: string }) => void;
  logoutUser: () => void;
  verifyToken:  () => boolean;
}

const initialState = {
  iat: null,
  exp: null,
  id: null,
  token: null,
  name: null,
  surname: null,
   src:null,
  email: null,
  roleId: null,
   
};

const UserContext = createContext<IUserProvider>({} as IUserProvider);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserContext>(initialState);
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<any>();

  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (user.token) {
      fetchProfilePicture();
    }
  }, [user.token]);

  const loginUser = (postData: { email: string; password: string }) => {
    postLogin(postData)
      .then((res: any) => {
        handleLoginResponse(res, setUser);
        router.push("/");
      })
      .catch((err) => {
        console.log(`Bir hata meydana geldi. Err:${err?.response?.data?.content}`);
        showNotification(
          'warning',
          'Giriş Başarısız',
          'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyiniz.'
        );
      });
  };

  const logoutUser = () => {
    localStorage.removeItem("agency-web-user");
    setUser(initialState);
    router.push("/auth-pages/login");
  };

   const verifyToken = useCallback((): boolean => {
    if (user.token) {
      if (isTokenActive(user.exp || 0)) {
        return true;
      } else {
        setUser(initialState);
        return false;
      }
    } else {
      const storageReturn = localStorage.getItem("agency-web-user");

      if (storageReturn) {
        const storageResponse: IUserContext = JSON.parse(storageReturn);
        if (isTokenActive(storageResponse.exp || 0)) {
          setUser(storageResponse);
          return true;
        } else {
          localStorage.removeItem("agency-web-user");
          return false;
        }
      } else {
        return false;
      }
    }
  }, [user]);
  const fetchProfilePicture = async () => {
    try {
      const response:any = await fetchUserPhoto({ userId: user.id });

      
   /*    if (response.status!==200) {
        throw new Error(`API request failed with status: ${response.status}`);
      } */
      const pictureUrl = URL.createObjectURL(response);
      
      setUser(prevUser => ({
        ...prevUser,
        src: pictureUrl // Set the profile picture URL in the user context
      }));
    } catch (err) {
      console.log(`Bir hata meydana geldi. Err:${err}`);
    }
  };

  return <UserContext.Provider value={{ user, loginUser, logoutUser, verifyToken }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

const isTokenActive = (exp: number): boolean => {
  if (Math.floor(Date.now() / 1000) < exp) return true;
  else return false;
};

const handleLoginResponse = (res: any, setUser: Dispatch<SetStateAction<IUserContext>>) => {
  try {
    const decoded = jwtDecode<JwtPayload>(res.content.accessToken);
    /* 
    "id": 7,
            "email": "mustafaokta@hotmail.com",
            "name": "Mustafa",
            "surname": "Okta",
            "identityNumber": "6267000000",
            "active": true,
            "phoneNumber": "+90 (507) 569-2149",
            "address": null,
            "dateOfBirth": "2024-03-15T00:00:00.000Z",
            "gender": "erkek",
            "nationality": null,
            "roleId": 2,
            "avatar": null,
            "createdAt": "2024-03-24T17:54:17.765Z",
            "updatedAt": "2024-03-24T17:55:06.341Z"*/
    const obj: IUserContext = {
      iat: decoded.iat,
      exp: decoded.exp,
      token: res.content.accessToken,
      id: res.content.user.id,
      name: res.content.user.name,
      surname: res.content.user.surname,
      src: res.content.user?.src,
       email: res.content.user.email,
       roleId: res.content.user.roleId,
    };
    
    localStorage.setItem("agency-web-user", JSON.stringify(obj));
    localStorage.setItem("facit_authUsername", res.content.user.name);
    setUser(obj);
  } catch (error) {
    console.log(error);
  }
};
