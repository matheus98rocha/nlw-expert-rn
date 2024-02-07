import { Text } from "react-native";
import { ButtonChildrenProps } from "../../button.types";

export function ButtonText({ children }: ButtonChildrenProps) {
  return (
    <Text className="text-black font-heading text-base mx-2">{children}</Text>
  );
}
