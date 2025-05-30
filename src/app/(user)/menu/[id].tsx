import {View, Text, Image, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {defaultPizzaImage} from "@components/ProductListItem";
import {useState} from "react";
import Button from "@components/Button";
import {useCart} from "@/providers/CartProvider";
import {PizzaSize} from "@/types";
import {useProduct} from "@/api/products";



const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']


const ProductDetailPage = () => {

    const router = useRouter();

    const {id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString == 'string'? idString : idString[0]);
    const {data: product, error, isLoading} = useProduct(id);
    const { addItem } = useCart();


    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');

    }

    if (isLoading) return <ActivityIndicator />;
    if (error) return <Text> Failed :(</Text>;

    return (
        <View style={styles.container}>
            <Image source={{uri: product.image || defaultPizzaImage}}
                   style={styles.image}/>
            <Stack.Screen options={{title: product.name}}/>

            <Text>Select Size</Text>

            <View style={styles.sizes}>

                {sizes.map((size) => (
                    <Pressable
                        onPress={() => {
                            setSelectedSize(size);
                        }}
                        key={size}
                        style={[styles.size,
                            {backgroundColor: selectedSize === size ? 'gainsboro' : 'white'}]}>

                        <Text style={[styles.sizeText, {color: selectedSize == size ? 'black' : 'grey'}]}>
                            {size}
                        </Text>

                    </Pressable>
                ))}
            </View>


            <Text style={styles.price}>
                Price: ${product.price}
            </Text>

            <Button onPress={addToCart} text={"Add to Cart"}/>

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 100
    },
    size: {
        width: 50,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,

    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',


    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10


    },
});

export default ProductDetailPage;