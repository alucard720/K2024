import { View, Text, SafeAreaView, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import COLORS from "./Colors";

const Input = ({
  onChangeText,
  iconPosition,
  Icon,
  style,
  value,
  label,
  error,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  const getFlexDirection = () => {
    if (Icon && iconPosition) {
      if (iconPosition === "left") {
        return "row";
      } else if (iconPosition === "right") {
        return "row-reverse";
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return colors.danger;
    }

    if (focused) {
      return COLORS.grey;
    } else {
      return COLORS.grey;
    }
  };
  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}

      <View
        style={[
          styles.wrapper,
          { alignItems: Icon ? "center" : "baseline" },
          { borderColor: getBorderColor(), flexDirection: getFlexDirection() },
        ]}
      >
        <View>{Icon && Icon}</View>

        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 3,
    marginTop: 5,
  },

  inputContainer: {
    paddingVertical: 5,
  },

  textInput: {
    flex: 1,
    width: "100%",
  },

  error: {
    color: COLORS.red,
    paddingTop: 4,
    fontSize: 12,
  },
});
export default Input;
