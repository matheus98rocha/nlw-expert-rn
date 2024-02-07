import React from "react";
import { ButtonProps } from "./button.types";
import { TouchableOpacity } from "react-native";
import { ButtonText } from "./components/button-text/button-text";
import { ButtonIcon } from "./components/button-icon/button-icon";

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="h-12 bg-lime-400 rounded-md items-center justify-center 
      flex-row"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

// Trazendo os componentes ButtonText e ButtonIcon
Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
