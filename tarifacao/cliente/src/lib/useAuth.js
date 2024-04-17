import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const TOKEN_URL = import.meta.env.VITE_TOKEN_URL;
const CLIENT_SECRET = import.meta.env.VITE_TARIFACAO_CLIENT_SECRET;

export const useAuth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const setCookie = useCookies()[1];

    const authorization_code = searchParams.get("code")

    console.log(CLIENT_SECRET)

    useEffect(() => {
        if (authorization_code) {
            axios.post(TOKEN_URL, {
                grant_type: "authorization_code",
                code: authorization_code,
                client_secret: CLIENT_SECRET
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(response => {
                    setCookie("access_token", response.data.access_token);
                    setSearchParams();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [authorization_code])
};