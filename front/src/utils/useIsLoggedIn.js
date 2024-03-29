import { useCookies } from "react-cookie";

export const useIsLoggedIn = () => {
    const [cookies] = useCookies();
    return !!cookies.access_token;
}