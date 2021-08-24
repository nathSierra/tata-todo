import { createContext, ReactNode, useContext, useState } from "react";
import { initialUser } from "../components/LoginForm/LoginForm";
import { initialTeam } from "../components/TeamForm/TeamForm";
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
    const persistentUserData = process.browser ? localStorage.getItem('user-data') : null;
    const persistentTeamData = process.browser ? localStorage.getItem('user-team') : null;
    const [user, setUser] = useState<any | null>(persistentUserData ? JSON.parse(persistentUserData) : initialUser);
    const [team, setTeam] = useState<any | null>(persistentTeamData ? JSON.parse(persistentTeamData) : initialTeam);

    const login = (user: Iuser) => {
        setUser(user);
        setTeam(user.teams ? user.teams[0] : initialTeam);
        const {teams} = user;
        localStorage.setItem('user-data', JSON.stringify(user));
        user.teams ? localStorage.setItem('user-team', JSON.stringify(user.teams[0])) : localStorage.setItem('user-team', JSON.stringify(initialTeam))

    };

    const assignTeam = (team: Iteam | string) => {
        setTeam(team);
        localStorage.setItem('user-team', JSON.stringify(team))
        localStorage.removeItem('user-team')
    }

    const removeTeam = () => {
        setTeam(null);
    }

    const logout = () => {
        setUser(null);
            localStorage.removeItem('user-data');
            localStorage.removeItem('user-team')
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