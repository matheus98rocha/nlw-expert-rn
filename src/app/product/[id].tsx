import React, { useCallback, useMemo } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Button } from "@/components/button/button";
import { Feather } from "@expo/vector-icons";
import LinkButton from "@/components/link-button/link-button";
import { useCartStore } from "@/stores/cart-store";

function Product() {
  const { id } = useLocalSearchParams();
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const product = useMemo(() => {
    return PRODUCTS.find((product) => product.id === id);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product) {
      cartStore.add(product);
      navigation.goBack();
    }
  }, []);

  if (!product) {
    return <Redirect href={"/"} />;
  }

  return (
    <ScrollView>
      <View className="flex-1">
        <Image
          source={product.cover}
          className="w-full h-52"
          resizeMode="cover"
        />
        <View className="p-5 mt-8 flex-1">
          <Text className="text-white text-xl font-heading">
            {product.title}
          </Text>
          <Text className="text-lime-400 text-2xl font-heading my-2">
            {formatCurrency(product.price)}
          </Text>

          <Text className="text-slate-400 font-body text-base leading-6 mb-6">
            {product.description}
          </Text>

          {product.ingredients.map((ingrediente, index) => (
            <Text
              className="text-slate-400 font-body text-base leading-6"
              key={index}
            >
              {"\u2022"}
              {ingrediente}
            </Text>
          ))}
        </View>

        <View className="p-5 pb-8 gap-5">
          <Button onPress={() => handleAddToCart()}>
            <Button.Icon>
              <Feather name="plus-circle" size={20} />
            </Button.Icon>
            <Button.Text>Adicionar ao Pedido</Button.Text>
          </Button>
          <LinkButton href="/" title="Voltar ao cardápio" />
        </View>
      </View>
    </ScrollView>
  );
}

export default Product;
