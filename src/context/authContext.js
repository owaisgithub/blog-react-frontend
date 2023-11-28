import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    authenticated : false,
    login : () => {}
})

export const AuthProvider = AuthContext.Provider;

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;