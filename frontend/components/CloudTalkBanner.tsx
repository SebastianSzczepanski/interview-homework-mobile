import {
	Linking,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
	View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { SocialIcons } from "@/constants/SocialIcons";

export const CloudTalkBanner = () => {
	const theme = useColorScheme() ?? "light";

	const openURL = (url: string) => {
		Linking.openURL(url).catch((err) =>
			console.error("An error occurred", err),
		);
	};

	return (
		<View style={styles.header}>
			<ThemedText
				type="defaultSemiBold"
				style={styles.headerText}
				lightColor={Colors.light.textInverse}
				darkColor={Colors.dark.textInverse}
			>
				Welcome adventurer and Good luck, looking forward to meeting
				you!
			</ThemedText>
			<View style={styles.socialIcons}>
				{SocialIcons.map((icon) => (
					<TouchableOpacity
						key={icon.name}
						onPress={() => {
							openURL(icon.link);
						}}
					>
						<IconSymbol
							name={icon.name as IconSymbolName}
							size={18}
							weight="medium"
							color={
								theme === "light"
									? Colors.light.textInverse
									: Colors.dark.textInverse
							}
						/>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#0A0A32",
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 4,
		alignItems: "center",
	},
	headerText: {
		flex: 1,
	},
	socialIcons: {
		flexDirection: "row",
		gap: 10,
	},
});
