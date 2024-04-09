import axios from "axios"
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { API_PROTOCOL_HOSTNAME_PORT } from "./utils";

export const useAxiosWithToken = () => {
    const [cookies] = useCookies();
    const loggedIn = useIsLoggedIn();
    const [hasToken, setHasToken] = useState(false);

    const axiosWithToken = axios.create();

    useEffect(() => {
        if (loggedIn) {
            axiosWithToken.interceptors.request.use(function (config) {
                config.headers = { ...config.headers, Authorization: 'Bearer ' + cookies.access_token }
                return config;
            });
            setHasToken(true);
        }
    }, [cookies.access_token, axiosWithToken.interceptors.request, loggedIn])

    return [axiosWithToken, hasToken];
}