import ProductListItem from "@components/ProductListItem";
import {ActivityIndicator, FlatList, View, Text} from "react-native";
import {useProductList} from "@/api/products";

export default function MenuScreen() {

    const {error, data: products, isLoading} = useProductList()

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text> Failed :(</Text>;
    return (

        <FlatList
            data={products}
            renderItem={({ item }) => <ProductListItem product={item}/>}
            numColumns={2}
            contentContainerStyle={{gap: 10, padding: 10}}
            columnWrapperStyle={{gap: 10}}
        />

    );
};




