import {View, Text, Platform} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useCart} from "@/providers/CartProvider";



const CartScreen = () => {
    const {items} = useCart();
    return (
        <View>
            <Text>
                CART {items.length}
            </Text>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
};

export default CartScreen