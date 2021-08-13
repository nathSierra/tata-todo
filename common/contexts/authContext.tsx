import { createContext, ReactNode, useContext, useState } from "react";
import { Iuser } from "../models";

type authContextType = {
    user: Iuser | null;
    login: (user: Iuser) => void;
    logout: () => void;
};

const authContextDefaultValues: authContextType = {
    user: null,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

const NathanUser = {
  firstName: 'Nathan',
  lastName: 'Sierra',
  email: 'email.tail',
  id: '1',

}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<Iuser | null>(null);

    const login = (user: Iuser) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}