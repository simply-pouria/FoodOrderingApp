import orders from '@assets/data/orders'
import OrderListItem from "@components/OrderListItem";
import {FlatList} from "react-native";
import {Stack} from "expo-router";
import React from "react";
import {View} from "react-native"

export default function OrdersScreen() {
    return (
        <View>
            <Stack.Screen options={{title: "Archive"}}/>
            <FlatList
                data={orders}
                renderItem={({item}) => <OrderListItem order={item}/>}/>
        </View>
    );
};