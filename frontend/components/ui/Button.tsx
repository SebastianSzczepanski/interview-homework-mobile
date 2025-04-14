import React from "react";
import {
    StyleSheet,
    useColorScheme,
    ActivityIndicator,
    ViewStyle,
    Pressable,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";

interface ButtonProps {
    variant?: "primary" | "secondary";
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    title,
    onPress,
    style,
    disabled = false,
    loading = false,
}) => {
    const theme = useColorScheme();
    const isDarkMode = theme === "dark";

    const buttonStyles = [
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        isDarkMode && { backgroundColor: Colors.dark.tint },
        disabled && styles.disabledButton,
        style,
    ];
    const textStyles = [
        styles.text,
        variant === "secondary" && { color: Colors.light.tint },
        isDarkMode && { color: Colors.dark.text },
        disabled && styles.disabledText,
    ];

    return (
        <Pressable
            style={buttonStyles}
            onPress={!disabled && !loading ? onPress : undefined}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === "secondary" ? Colors.light.tint : "white"}
                />
            ) : (
                <ThemedText type="defaultSemiBold" style={textStyles}>{title}</ThemedText>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.tint,
        padding: 12,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
		height: 48,
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: Colors.light.tint,
    },
    disabledButton: {
        borderColor: Colors.light.icon,
    },
    text: {
        color: Colors.light.textInverse,
    },
    disabledText: {
        color: Colors.light.icon,
    },
});

export default Button;