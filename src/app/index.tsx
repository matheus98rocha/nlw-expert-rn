import { View, FlatList, SectionList, Text } from "react-native";
import { useCallback, useState, useRef, useMemo } from "react";
import CategoryButton from "@/components/category-button/category-button";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";
import Header from "@/components/header/header";
import { Link } from "expo-router";
import { Product } from "@/components/product/product";
import { useCartStore } from "@/stores/cart-store";

export default function Home() {
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const cartStore = useCartStore();

  const cartQuantityItems = useMemo(() => {
    return cartStore.products.reduce(
      (total, product) => total + product.quantity,
      0
    );
  }, [cartStore.products]);

  const handleCategorySelect = useCallback((selectedCategory: string) => {
    setCategory(selectedCategory);

    // Capturando o index da categoria
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }, []);

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça o seu pedido" cartQuantityItems={cartQuantityItems} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            onPress={() => handleCategorySelect(item)}
            isSelected={category === item}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
