import { Text } from "react-native";
type BoldTextProps = {
  fullText: string;
  boldTextParts: string[];
  boldWeight: string;
  fontStyles: string;
  boldStyles: string;
};
export const BoldText: React.FC<BoldTextProps> = (props) => {
  const { fullText, boldTextParts, boldWeight, fontStyles, boldStyles } = props;
  const regEx = new RegExp(`\\b(${boldTextParts.join("|")})\\b`, "gi");
  const splitText = fullText.split(regEx);

  return (
    <Text>
      {splitText.map((textPart, i) =>
        boldTextParts.includes(textPart) ? (
          <Text
            key={i}
            className={`font-${boldWeight} ${fontStyles} ${boldStyles}`}
          >
            {textPart}
          </Text>
        ) : (
          <Text className={`${fontStyles}`} key={i}>
            {textPart}
          </Text>
        )
      )}
    </Text>
  );
};
