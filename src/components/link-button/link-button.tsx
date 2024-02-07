import { Link } from "expo-router";
import React from "react";
import { LinkButtonProps } from "./link-button.types";

function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  );
}

export default LinkButton;
