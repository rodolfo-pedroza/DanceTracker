import { memo, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";

const RecommendationsCard = memo(() => {
  const tailwind = useTailwind();
  const navigation = useNavigation();

  console.log("RecommendationsCard rendered");

  useEffect(() => {
    console.log("RecommendationsCard changed");
  }, []);

  return (
    <View style={tailwind("my-2 mx-8 px-4 rounded-3xl")}>
      <View style={tailwind("flex-1 justify-center items-center")}>
        <TouchableOpacity
          style={tailwind("rounded-3xl p-2.5 w-8 bg-purple-300")}
          onPress={() => navigation.navigate("RecommendationsPage")}
        >
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default RecommendationsCard;
