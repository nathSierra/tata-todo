import { createContext, ReactNode, useContext, useState } from "react";
import { Iteam, Iuser } from "../models";

type authContextType = {
    user: Iuser | null;
    login: (user: Iuser) => void;
    logout: () => void;
    team: Iteam | null;
    assignTeam: (team: Iteam) => void;
    removeTeam: () => void;
};

const authContextDefaultValues: authContextType = {
    user: null,
    team: null,

    login: () => {},
    logout: () => {},

    assignTeam: () => {},
    removeTeam: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};


export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<Iuser | null>(null);
    const [team, setTeam] = useState<Iteam | null>(null);

    const login = (user: Iuser) => {
        setUser(user);
    };

    const assignTeam = (team: Iteam) => {
        setTeam(team);
    }

    const removeTeam = () => {
        setTeam(null);
    }

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        team,
        login,
        logout,
        assignTeam,
        removeTeam
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}