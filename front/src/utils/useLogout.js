import { useCookies } from 'react-cookie';

export const useLogout = () => {
    const removeCookie = useCookies()[2];
    const logout = () => {
        removeCookie("access_token");
    }
    return logout;
}