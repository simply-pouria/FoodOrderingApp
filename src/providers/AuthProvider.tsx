import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import constantsServer from "expo-constants/src/Constants.server";
import {Session} from "@supabase/auth-js";

type AuthData = {
    session: Session | null;
    loading: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
});


export function AuthProvider({ children }: PropsWithChildren<AuthData>) {

    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() =>{
        const fetchSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            console.log(data)
        };
        fetchSession();
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);


    return <AuthContext.Provider value={{session, loading}}>{children}</AuthContext.Provider>;}

export const useAuth = () => useContext(AuthContext);