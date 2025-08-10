import { TextInputProps } from "react-native";

export type FormFieldProps = TextInputProps & {
  title: string;
  value: string | undefined;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  error?: string;
  type?: "text" | "password" | "number" | "email" | "decimal" | "phone";
  containerStyles?: string;
  disabled?: boolean;
};
