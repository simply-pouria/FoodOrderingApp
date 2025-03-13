import {Order} from "@/types";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {Link, useSegments} from "expo-router";
import Colors from "@/constants/Colors";
import dayjs from 'dayjs';

type OrderListItemProps = {
    order: Order;
}

const OrderListItem = ({order}: OrderListItemProps) => {
    const orderTime = dayjs(order.created_at).format('YYYY-MM-DD HH:mm:ss');

    return (
        <Link href={`/(user)/orders/${order.id}`as any} asChild={true}>
            <Pressable style={styles.container}>
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
            </Pressable>
        </Link>
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