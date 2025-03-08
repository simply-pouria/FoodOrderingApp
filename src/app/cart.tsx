import {View, Text, Platform} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useCart} from "@/providers/CartProvider";



export default function CartScreen() {
    const {items} = useCart();
    console.log("this is running man");
    return (
        <View>
            <Text>
                CART {items.length}
            </Text>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
};

