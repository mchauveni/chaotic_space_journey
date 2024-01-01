import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';
import ApiHandler from '../../ApiHandler';

interface AuthContextProviderProps {
    children: ReactElement;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("agent-token"));
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (token && token.length != 0) {
            setIsLoggedIn(true);
        }
    }, [])

    // Get agent using token in arguments
    async function login(token: string): Promise<void> {
        try {
            const response = await ApiHandler.getAgent(token);
            localStorage.setItem("agent-token", JSON.stringify(response));
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    function logout(): void {
        setToken(null);
        localStorage.removeItem("agent-token");
        ApiHandler.token = null;
        navigate('/login');
    }

    return <AuthContext.Provider value={{ token, isLoggedIn, login, logout, }}>
        {children}
    </AuthContext.Provider>;
}