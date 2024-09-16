import { Image, Pressable, Text, } from "react-native";
import { router } from "expo-router";

interface MealCard {
  dateModified: string | null;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string | null;
  strDrinkAlternate: string | null;
  strImageSource: string | null;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
}
type Meal = {
  meal: MealCard;
};
const MealCard: React.FC<Meal> = ({ meal }) => {
  return (
    <Pressable className="w-5/12 aspect-2/3 overflow-hidden flex flex-col items-center rounded-md mt-4" 
    onPress={() => {router.push(`/${meal.idMeal}`)}}
    >
      <Image
        className="object-cover aspect-square w-full rounded-md"
        source={{ url: meal.strMealThumb }}
      />
      <Text className="w-full text-left text-lg font-bold p-1">{meal.strMeal}</Text>
      <Text className="absolute left-0 italic p-1 w-full bg-faint">{meal.strArea}</Text>
    </Pressable>
  );
};

export default MealCard;
