import axios from "axios"
import { useCookies } from "react-cookie";
import { useIsLoggedIn } from "./useIsLoggedIn";

const API_PROTOCOL_HOSTNAME_PORT = import.meta.env.VITE_API_PROTOCOL_HOSTNAME_PORT;

export const useAxiosWithToken = () => {
    const [cookies] = useCookies();
    const loggedIn = useIsLoggedIn();

    const axiosWithToken = axios.create();

    if (loggedIn) {
        axiosWithToken.interceptors.request.use(config => {
            config.headers.Authorization = 'Bearer ' + cookies["access_token"];
            config.baseURL = API_PROTOCOL_HOSTNAME_PORT;
            config.withCredentials = true;
            return config;
        });
    }

    return axiosWithToken;
}