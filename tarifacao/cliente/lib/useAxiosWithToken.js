import axios from "axios"
import { useCookies } from "react-cookie";
import { useIsLoggedIn } from "./useIsLoggedIn";

const API_PROTOCOL_HOSTNAME_PORT = import.meta.env.VITE_API_PROTOCOL_HOSTNAME_PORT;

export const useAxiosWithToken = (client_type) => {
    const [cookies] = useCookies();
    const loggedIn = useIsLoggedIn(client_type);

    const axiosWithToken = axios.create();

    axiosWithToken.interceptors.request.use(function (config) {
        config.baseURL = API_PROTOCOL_HOSTNAME_PORT;
        return config;
    });

    if (loggedIn) {
        axiosWithToken.interceptors.request.use(function (config) {
            config.headers = { ...config.headers, Authorization: 'Bearer ' + cookies["access_token"] }
            return config;
        });
    }

    return axiosWithToken;
}