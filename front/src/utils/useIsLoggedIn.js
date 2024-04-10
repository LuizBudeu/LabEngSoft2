import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useIsLoggedIn = (client_type) => {
    // const [isLoggedIn, setIsLoggedIn] = useState();
    const [cookies] = useCookies();
    // useEffect(() => {
    //     console.log("useIsLoggedIn");
    //     console.log(cookies.access_token_type);
    //     console.log(client_type);
    //     console.log(cookies.access_token);
    //     setIsLoggedIn(cookies.access_token_type == client_type && !!cookies.access_token);
    // }, [])
    // return isLoggedIn;

    console.log("useIsLoggedIn");
    console.log(client_type);
    console.log(cookies['access_token_'+client_type]);
    return client_type != '' && !!cookies['access_token_'+client_type];
}