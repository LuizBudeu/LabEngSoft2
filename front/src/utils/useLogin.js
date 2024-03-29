import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "../interceptors/axios";

const TOKEN_URL = process.env.REACT_APP_TOKEN_URL;

export const useLogin = (client_secret) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [cookies, setCookie] = useCookies();

    const authorization_code = searchParams.get("code")

    useEffect(() => {
        if (authorization_code) {
            axios.post(TOKEN_URL, {
                grant_type: "authorization_code",
                code: authorization_code,
                client_secret
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(response => {
                    setCookie("access_token", response.data.access_token);
                    setSearchParams("");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [authorization_code])

    const loggedIn = !!cookies.access_token;
    return loggedIn;
};