import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

export const useLogout = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const removeCookie = useCookies()[2];
    const logout = () => {
        removeCookie("access_token");
        const {id, newSearchParams} = {...searchParams}
        setSearchParams(newSearchParams);
    }
    return logout;
}