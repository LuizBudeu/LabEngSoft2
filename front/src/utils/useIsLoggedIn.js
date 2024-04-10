import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useIsLoggedIn = (client_type) => {
    const [cookies] = useCookies();
    return client_type != '' && !!cookies['access_token_'+client_type];
}