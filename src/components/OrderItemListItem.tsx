import {OrderItem} from "@/types";
import {Pressable, StyleSheet, Text, View, Image} from "react-native";
import Colors from "@/constants/Colors";
import dayjs from 'dayjs';
import products from "@assets/data/products";
import {defaultPizzaImage} from "@components/ProductListItem";


type OrderItemListItemProps = {
    orderItem: OrderItem;
}

const OrderListItem = ({orderItem}: OrderItemListItemProps) => {

    const product = orderItem.products
    const itemPrice = product.price*orderItem.quantity
    return (
        <View style={styles.container}>
            <Image source={{uri: product.image || defaultPizzaImage}}
                   style={styles.image}
                   resizeMode="contain"
            />
            <View style={styles.leftContainer}>
                <Text style={styles.title}>
                    {product.name}
                </Text>
                <Text style={styles.price}>
                    ${itemPrice}
                </Text>
                <Text style={styles.size}>
                    Size: {orderItem.size}
                </Text>
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.quantity}>
                    {orderItem.quantity}
                </Text>
            </View>
        </View>

    );
};

export default OrderListItem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        marginVertical: 5,
    },
    price: {
        color: Colors.light.tint,
        fontSize: 12,
        fontWeight: '600',
    },
    image: {
        width: '25%',
        aspectRatio: 1,
        marginRight: 10,
    },
    quantity: {
      fontSize: 18,
        fontWeight: '600',
    },
    size: {
        fontSize: 12,
        fontWeight: '600',
        color: 'grey'
    }
});