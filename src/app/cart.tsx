import { useCallback, useMemo, useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import Header from "@/components/header/header";
import { Product } from "@/components/product/product";
import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import Input from "@/components/input/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/button/button";
import { Feather } from "@expo/vector-icons";
import LinkButton from "@/components/link-button/link-button";
import { ProductCartProps } from "@/types/product-cart.types";
import { useNavigation } from "expo-router";

export default function Cart() {
  const phoneNumber = process.env.EXPO_PUBLIC_MY_CELL_PHONE;
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const totalPrice = useMemo(() => {
    return formatCurrency(
      cartStore.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    );
  }, []);

  const handleProductRemove = useCallback((product: ProductCartProps) => {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }, []);

  const handleOrder = () => {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity} - ${product.title}`)
      .join("");

    const message = `
        NOVO PEDIDO
        \n Entregar em: ${address}
       
        ${products}
       
        \n Valor total: ${totalPrice}
      `;
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`
    );
    // Adicionar uma mensagem de Pedido enviado com sucesso
    cartStore.clear();
    navigation.goBack();
  };

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStore.products.length > 0 ? (
              <>
                <View className="border-b border-slate-700">
                  {cartStore.products.map((product) => (
                    <Product
                      key={product.id}
                      data={product}
                      onPress={() => handleProductRemove(product)}
                    />
                  ))}
                </View>
                <View className="flex-row gap-2 items-center mt-5 mb-4">
                  <Text className="text-white text-xl font-subtitle">
                    Total:
                  </Text>
                  <Text className="text-lime-400 text-2xl font-heading">
                    {totalPrice}
                  </Text>
                </View>
                <Input
                  onChangeText={setAddress}
                  placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                  blurOnSubmit={true}
                  onSubmitEditing={handleOrder}
                  returnKeyType="next"
                />
              </>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vázio
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        {cartStore.products.length > 0 && (
          <Button onPress={handleOrder}>
            <Button.Text>Enviar Pedido</Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20} />
            </Button.Icon>
          </Button>
        )}
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  );
}
