import orders from '@assets/data/orders'
import OrderListItem from "@components/OrderListItem";
import {FlatList} from "react-native";

export default function OrdersScreen() {
    return (
        <FlatList
            data={orders}
            renderItem={({item}) => <OrderListItem order={item}/>}
        />


    )
}