import { Stack } from 'expo-router';

export default function OrdersLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "Orders"
                }}
            />
        </Stack>
    );
};




