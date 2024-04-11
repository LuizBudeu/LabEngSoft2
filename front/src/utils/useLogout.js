import { useCookies } from 'react-cookie';
import { useSearchParams } from 'react-router-dom';

export const useLogout = (client_type) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const removeCookie = useCookies()[2];
    const logout = () => {
        removeCookie("access_token_"+client_type);
        const {id, newSearchParams} = {...searchParams}
        setSearchParams(newSearchParams);
    }
    return logout;
}