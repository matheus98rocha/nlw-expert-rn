import { PressableProps } from "react-native";

export interface CategoryProps extends PressableProps {
  title: string;
  isSelected?: boolean;
}
