import { useContext, useEffect,} from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {
    const login = async (email, password) => {
        const abortController = new AbortController();  // ✅ Create a new controller for every request

        try {
            const result = await request.post(
                `${baseUrl}/login`,
                { email, password },
                { signal: abortController.signal }
            );
            return result;
        } catch (err) {
            if (err.name === "AbortError") {
                console.log("Login request was aborted.");
            } else {
                throw err; // Re-throw other errors
            }
        }
    };

    return {
        login,
    };
};

export const useRegister = () => {
    const register = (email, password) => {
    return request.post(`${baseUrl}/register`, {email, password})
    }

    return {
        register,
    }
};

export const useLogout = () => {

    const {accessToken, userLogoutHandler} = useContext(UserContext);

    useEffect(() => {
        if(!accessToken){
            return;
        }
        
        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        };

    request.get(`${baseUrl}/logout`,null, options)
      .then(userLogoutHandler);


    }, [accessToken, userLogoutHandler]);
    return {
        isLoggedOut: !!accessToken,
    }
 
};