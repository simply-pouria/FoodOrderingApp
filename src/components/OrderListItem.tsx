import {Order} from "@/types";
import {Pressable, Text} from "react-native";
import {Link, useSegments} from "expo-router";


type OrderListItemProps = {
    order: Order;
}

const OrderListItem = ({order}: OrderListItemProps) => {


    return (
        <Link href={`/(user)/orders/${order.id}`as any} asChild={true}>
            <Pressable>
                <Text>
                    {order.id}
                </Text>
                <Text>
                    {order.created_at}
                </Text>
                <Text>
                    {order.status}
                </Text>
            </Pressable>
        </Link>

    );

};

export default OrderListItem;

