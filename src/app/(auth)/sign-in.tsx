import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React, { useState } from 'react';
import Colors from "@/constants/Colors";
import Button from '@/components/Button';
import {Link, Stack, useRouter} from 'expo-router';
import {supabase} from "@/lib/supabase";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const {error} = await supabase.auth.signInWithPassword({email, password});

        if (error) Alert.alert(error.message);
        setLoading(false);

    }

    const router = useRouter();

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
        if (!validateInput()) {
            return;
        }

        console.warn('signing user in', email);
        setEmail('');
        setPassword('');
        router.back();
    };


    return (
        <View style={styles.container}>

            <Stack.Screen options={{title: "Sign In"}}
            />


            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                style={styles.input}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="*****"
                style={styles.input}
                secureTextEntry={true}
            />
            <Text style={styles.error}>{errors}</Text>
            <Button onPress={signInWithEmail} disabled={loading} text={loading? "Signing In" : "Sign In"}/>
            <Link href={'/sign-up' as any} asChild>
                <Text style={styles.textButton}> Create an Account </Text>
            </Link>
        </View>
    );
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

export default SignInPage;