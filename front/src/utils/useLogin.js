import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { API_PROTOCOL_HOSTNAME_PORT } from "./utils";
import { useAxiosWithToken } from "./useAxiosWithToken";

const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;

export const useLogin = (clientSecret) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const loggedIn = useIsLoggedIn();
    const setCookie = useCookies()[1];

    const authorization_code = searchParams.get("code")

    useEffect(() => {
        if (authorization_code) {
            axios.post(TOKEN_URL, {
                grant_type: "authorization_code",
                code: authorization_code,
                client_secret: clientSecret
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(response => {
                    setCookie("access_token", response.data.access_token);
                    const {code, newSearchParams} = {...searchParams}
                    setSearchParams(newSearchParams);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [authorization_code])

    return loggedIn;
};