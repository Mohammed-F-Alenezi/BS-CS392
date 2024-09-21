import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  onPress,
  containerStyle,
  isLoading,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      className={`bg-[#253745] rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-white text-lg font-semibold ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
