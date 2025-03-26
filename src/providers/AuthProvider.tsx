import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import constantsServer from "expo-constants/src/Constants.server";
import {Session} from "@supabase/auth-js";


type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
    session: null,
    profile: null,
    loading: true,
    isAdmin: false,
});


export function AuthProvider({ children }: PropsWithChildren<AuthData>) {

    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState(null);


    useEffect(() =>{
        const fetchSession = async () => {
            const { data: {session} } = await supabase.auth.getSession();
            setSession(session)


            if (session) {
                // fetch profile
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data || null);
            }

            setLoading(false);
        };

        fetchSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);


    // @ts-ignore
    return <AuthContext.Provider value={{session, loading, profile, isAdmin: profile?.group == "ADMIN"}}>{children}</AuthContext.Provider>;}

export const useAuth = () => useContext(AuthContext);