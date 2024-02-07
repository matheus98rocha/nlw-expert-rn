import CategoryButton from "@/components/category-button/category-button";
import { CATEGORIES } from "@/utils/data/products";
import Header from "@/components/header/header";
import { View, FlatList } from "react-native";
import { useCallback, useState } from "react";

export default function Home() {
  const [category, setCategory] = useState<string>(CATEGORIES[0]);

  const handleCategorySelect = useCallback((category: string) => {
    setCategory(category);
  }, []);
  return (
    <View className="flex-1 pt-8">
      <Header title="Faça o seu pedido" cartQuantityItems={1} />
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
    </View>
  );
}
