import { isExpired, decodeToken } from "react-jwt";


const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    if(token){
        const decoded_token = decodeToken(token);
        const is_espired = isExpired(token);
        if(!decoded_token && is_espired){
            localStorage.removeItem('token')
            return false
        } else {
            return true
        }
    }else{
        return false
    }
}

export default isAuthenticated;
