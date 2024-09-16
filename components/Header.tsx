import { Linking, Text } from "react-native";

type HeaderProps = {
  text: string;
  textStyles?: string;
  link?: string;
};
const Header: React.FC<HeaderProps> = ({ text, textStyles, link }) => {
  return (
    <Text
      className={`w-full text-center text-4xl ${textStyles}`}
      onPress={() => (link ? Linking.openURL(link) : null)}
    >
      {text}
    </Text>
  );
};
export default Header;
