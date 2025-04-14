import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface ScreenHeaderProps {
	title: string;
}

export const ScreenHeader = ({ title }: ScreenHeaderProps) => {
	const router = useRouter();
	const theme = useColorScheme() ?? "light";

	return (
		<Stack.Screen
			options={{
				title,
				headerShown: true,
				headerLeft: () => (
					<Pressable onPress={router.back} style={styles.backIcon}>
						<Ionicons
							name="arrow-back"
							size={24}
							color={Colors[theme].text}
						/>
					</Pressable>
				),
			}}
		/>
	);
};

const styles = StyleSheet.create({
	backIcon: {
		padding: 8,
	},
});
