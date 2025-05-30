import {View, Text, Image, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import {Link, Stack, useLocalSearchParams, useRouter} from "expo-router";
import products from "@assets/data/products";
import {defaultPizzaImage} from "@components/ProductListItem";
import {useState} from "react";
import Button from "@components/Button";
import {useCart} from "@/providers/CartProvider";
import {PizzaSize} from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
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

            <Stack.Screen options=
                {{title: 'Menu',
                    headerRight: () => (

                        <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                            <Pressable>
                                {({pressed}) => (

                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}

                                    />

                                )}
                            </Pressable>
                        </Link>
                    ),
                }
                }/>

            <Image source={{uri: product.image || defaultPizzaImage}}
                   style={styles.image}/>
            <Stack.Screen options={{title: product.name}}/>



            <Text style={styles.title}>
                {product.name}
            </Text>


            <Text style={styles.price}>
                Price: ${product.price}
            </Text>


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
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }

});

export default ProductDetailPage;