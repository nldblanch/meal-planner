import { Appearance, Image, Linking, Pressable, Text, View } from "react-native";
import { icons } from "@/constants";
import { router } from "expo-router";
type HeaderProps = {
  text: string;
  textStyles?: string;
  link?: string;
};
type Args = {
  icon: any;
};
const HeaderIcon = ({ icon }: Args) => {
  const colorScheme = Appearance.getColorScheme()
  const tintColor = colorScheme === "dark" ? "white" : "black"
  return (
    <Pressable className="flex items-center justify-center absolute left-0 p-4" onPress={() => router.back()}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={tintColor}
        className="w-6 h-6"
      />
    </Pressable>
  );
};
const Header: React.FC<HeaderProps> = ({ text, textStyles, link }) => {
  return (
    <View className="w-full flex flex-row items-center mb-4">
      {router.canGoBack() && <HeaderIcon icon={icons.leftArrow}/>}
      <Text
        className={`text-center text-4xl mx-12 h-full grow text-text dark:text-darkText`}
        onPress={() => (link ? Linking.openURL(link) : null)}
      >
        {text}
      </Text>
    </View>
  );
};
export default Header;
