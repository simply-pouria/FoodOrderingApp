import dayjs from "dayjs";

;import {View, Text, Image, StyleSheet, Pressable} from "react-native";
import {Stack, useLocalSearchParams, useNavigation} from "expo-router";
import React from "react";
import orders from '@assets/data/orders'
import {Order} from "@/types";


const OrderDetailPage = () => {

    const {id} = useLocalSearchParams();
    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
        return <Text>Order not found</Text>;
    }

    const orderTime = dayjs(order.created_at).format('YYYY-MM-DD HH:mm:ss');


    return (
        <View style={styles.main_container}>
            <Stack.Screen options={{title: `Order ${order.id}`}}/>


            <View style={styles.title_container}>
                <View style={styles.leftContainer}>
                    <Text style={styles.title}>
                        Order #{order.id}
                    </Text>
                    <Text style={styles.time}>
                        {orderTime}
                    </Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.status}>
                        {order.status}
                    </Text>
                </View>
            </View>


            
        </View>

           );

};



export default OrderDetailPage;


const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title_container: {
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
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
    status: {
        fontWeight: '600',
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        marginVertical: 5,
    },
    time: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '600',
    }
});

