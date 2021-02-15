/*componentの雛形
import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";

type Props = {};

export const ShopReviewItem: React.FC<Props> = ({}: Props) => {
    return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
    container: {}
});
*/

import React from "react";
import {View, StyleSheet, Text, Image, Dimensions} from "react-native";
//type
import { Shop } from "../types/shop";

const {width} = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2;

type Props = {
    shop: Shop;
};

export const ShopReviewItem: React.FC<Props> = ({shop}: Props) => {
    const {name, place, imageUrl, score} = shop;
    return (
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text>{name}</Text>
        <Text>{place}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CONTAINER_WIDTH,
        padding: 16
    },
    image: {
        width: IMAGE_WIDTH,
        height: IMAGE_WIDTH * 0.7,
    },
    nameText: {
        fontSize: 16,
        color: "#000",
        marginTop
    }
});