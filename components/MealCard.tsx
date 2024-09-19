import { Image, Pressable, Text, } from "react-native";
import { router } from "expo-router";
import { MealCardInterface } from "@/constants";

type MealCardProps = {
  meal: MealCardInterface;
  containerStyle?: string
};
const MealCard: React.FC<MealCardProps> = ({ meal, containerStyle }) => {
  return (
    <Pressable className={`w-5/12 aspect-2/3 overflow-hidden flex flex-col items-center rounded-md mt-4 bg-zinc-300 ${containerStyle}`}
    onPress={() => {router.push(`/(tabs)/search/meal/${meal.idMeal}`)}}
    >
      <Image
        className="object-cover aspect-square w-full rounded-md"
        source={{ url: meal.strMealThumb }}
      />
      <Text className="w-full text-left text-lg text-text dark:text-darkText font-bold p-1">{meal.strMeal}</Text>
      <Text className="absolute left-0 italic p-1 w-full bg-faint dark:bg-darkFaint text-text dark:text-darkText font-semibold">{meal.strArea}</Text>
    </Pressable>
  );
};

export default MealCard;
