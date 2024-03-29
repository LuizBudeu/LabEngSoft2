import axios from "axios"
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useIsLoggedIn } from "./useIsLoggedIn";

export const useAxiosWithToken = () => {
    const [cookies] = useCookies();
    const loggedIn = useIsLoggedIn();

    const axiosWithToken = axios.create();

    useEffect(() => {
        if (loggedIn) {
            axiosWithToken.interceptors.request.use(function (config) {
                config.headers = { ...config.headers, Authorization: 'Bearer ' + cookies.access_token }
                return config;
            });
        }
    }, [cookies.access_token, axiosWithToken.interceptors.request, loggedIn])

    return axiosWithToken;
}