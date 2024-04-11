import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useIsLoggedIn } from "./useIsLoggedIn";
import { API_PROTOCOL_HOSTNAME_PORT } from "./utils";
import { useAxiosWithToken } from "./useAxiosWithToken";

const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;

export const useLogin = (clientSecret, client_type) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const loggedIn = useIsLoggedIn(client_type);
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
                    console.log(client_type);
                    setCookie("access_token_"+client_type, response.data.access_token);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [authorization_code])

    return loggedIn;
};