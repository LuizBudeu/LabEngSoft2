import axios from "axios"
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { API_PROTOCOL_HOSTNAME_PORT } from "./utils";

export const useAxiosWithTokenPaciente = () => {
    return useAxiosWithToken("paciente");
}

export const useAxiosWithToken = (client_type) => {
    const [cookies] = useCookies();
    const loggedIn = useIsLoggedIn(client_type);
    const [hasToken, setHasToken] = useState(false);

    const axiosWithToken = axios.create();

    useEffect(() => {
        if (loggedIn) {
            axiosWithToken.interceptors.request.use(function (config) {
                config.headers = { ...config.headers, Authorization: 'Bearer ' + cookies["access_token_"+client_type] }
                return config;
            });
            setHasToken(true);
        }
    }, [axiosWithToken.interceptors.request, loggedIn])

    return [axiosWithToken, hasToken];
}