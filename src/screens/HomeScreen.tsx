import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, SafeAreaView } from "react-native";
// lib
import { getShops } from "../lib/firebase";
// components
import { ShopReviewItem } from "../components/ShopReviewItem";
//type
import { Shop } from "../types/shop";
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from "../types/navigation";
import { FloatingActionButton } from "../components/FloatingActionButton";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">
}

export const HomeScreen = ({navigation}: Props) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const shopItems = shops.map((shop, index) => (
    navigation.navigate("Shop", { shop })
  ));

  const onPressShop = (shop: Shop) => {
      navigation.navigate("Shop", { shop })
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate("")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E4",
    alignItems: "center",
    justifyContent: "center",
  },
});
