import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { FormFieldProps } from "./FormField.type";

export function FormField({
  title,
  value,
  placeholder,
  handleChangeText,
  type = "text",
  otherStyles = "",
  error,
  disabled = false,
  containerStyles,
  ...props
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  const keyboardType: TextInputProps["keyboardType"] = (() => {
    switch (type) {
      case "email":
        return "email-address";
      case "number":
        return "number-pad";
      case "decimal":
        return "decimal-pad";
      case "phone":
        return "phone-pad";
      default:
        return "default";
    }
  })();

  return (
    <View className={`flex  gap-2 ${containerStyles}`}>
      <Text className="text-textPrimary text-sm font-medium">{title}</Text>

      <View
        className={`w-full min-h-[65px] flex flex-row justify-between items-center bg-textSecondary/30 px-3 py-2 rounded-3xl ${otherStyles}`}
      >
        <TextInput
          className="placeholder:text-white/70 text-textPrimary p-0 font-pregular text-sm flex-1 py-2"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          placeholderTextColor="#ccc"
          secureTextEntry={isPasswordField && !showPassword}
          keyboardType={keyboardType}
          editable={!disabled}
          showSoftInputOnFocus={!disabled}
          caretHidden={disabled}
          {...props}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20} color="#F1F1F1" />
            ) : (
              <Eye size={20} color="#F1F1F1" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
}
