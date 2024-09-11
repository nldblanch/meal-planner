import { Text } from "react-native";

type HeaderProps = {
  text: string;
  textStyles?: string;
};
const Header: React.FC<HeaderProps> = ({ text, textStyles }) => {
  return (
    <Text className={`w-full text-center text-4xl ${textStyles}`}>{text}</Text>
  );
};
export default Header;
