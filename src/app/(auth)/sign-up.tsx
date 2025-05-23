import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import Button from "@components/Button";
import Colors from "@/constants/Colors";
import React, {useState} from "react";
import {Link, Stack, useRouter} from "expo-router";
import {supabase} from '@/lib/supabase'

const SignUpPage = () => {

    const  router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        const {error} = await supabase.auth.signUp({email, password});

        if (error) Alert.alert(error.message);
        setLoading(false);

    }

    const validateInput = () => {
        setErrors('');
        if (!email) {
            setErrors('Email is required');
            return false;
        }
        if (!password) {
            setErrors('password is required');
            return false;
        }
        return true;
    };

    const onSubmit = () => {

        if (validateInput()) {
            console.warn("account created:", email);
            setEmail('');
            setPassword('');
            router.back();
        } else  {
            return;
        }
    };

    return(
        <View style={styles.container}>

            <Stack.Screen options={{title: "Sign Up"}}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@example.com"
                style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="*****"
                secureTextEntry={true}
                style={styles.input}
            />

            <Text style={styles.error}>{errors}</Text>
            <Button text={loading? "Creating an Account ...": "Create an Account"}
                    disabled={loading}
                    onPress={signUpWithEmail}/>
            <Link href={'/sign-in' as any} asChild>
                <Text style={styles.textButton}> Sign In </Text>
            </Link>

        </View>
    )


};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    label: {
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
});

export default SignUpPage