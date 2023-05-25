import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTailwind } from "tailwind-rn";

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    height: 180,
  },
});

const CategoryCard = ({ categories }) => {
  const navigation = useNavigation();
  const tailwind = useTailwind();

  return (
    <>
      {categories.map((categoria) => (
        <TouchableOpacity
          style={tailwind("flex mt-4 mx-8 rounded-full bg-white")}
          key={categoria.name}
          onPress={() =>
            navigation.navigate("DanceRoutinesPage", { categoria })
          }
        >
          <ImageBackground
            source={{ uri: categoria.backgroundImage }}
            style={styles.card}
          >
            <View
              style={tailwind(
                "flex justify-center p-4 absolute bottom-0 left-0"
              )}
            >
              <Text style={tailwind("text-white text-lg font-bold")}>
                {categoria.name}
              </Text>
              <Text style={tailwind("text-white text-sm")}>
                {categoria.clases} Clases
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default CategoryCard;
