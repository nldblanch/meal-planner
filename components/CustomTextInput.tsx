import { ActivityIndicator, Image, TextInput, TouchableOpacity, View } from "react-native";
import {icons} from "../constants"

type TextInputProps = {
    onChangeText: any;
    value: string;
    placeholder: string;
    onPressFn: any;
    loading: boolean;
  };
const CustomTextInput: React.FC<TextInputProps> = ({
    onChangeText,
    value,
    placeholder,
    onPressFn,
    loading,
  }) => {
   
      return (
        <View className="h-fit flex w-full flex-row justify-between items-center pr-2 ml-2 rounded-md mt-4 border border-solid border-zinc-950">
          <TextInput
            className="h-8 m-1 p-1 w-1/2 "
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
          />
          <TouchableOpacity
            onPress={onPressFn}
            activeOpacity={0.7}
            className={`aspect-square rounded-xl max-h-18 flex flex-row justify-center items-center ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            <Image
              source={icons.plus}
              resizeMode="contain"
              className="w-8 h-8"
            />
            {loading && (
              <ActivityIndicator
                animating={loading}
                color="#fff"
                size="small"
                className="ml-2"
              />
            )}
          </TouchableOpacity>
        </View>
      );

  };

  export default CustomTextInput