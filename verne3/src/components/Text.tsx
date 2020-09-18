import React from "react";

export interface TextProps {
  text?: string;
}

export const Text = ({ text }: TextProps) => <span>{text}</span>;
