import {View, Text} from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";

const ProductDetailPage = () => {
    const {id} = useLocalSearchParams();

    return (
        <View>
            <Text>
                {id}
                <Stack.Screen options={{ title: 'Details' + id}} />
            </Text>
        </View>
    )
}

export default ProductDetailPage;