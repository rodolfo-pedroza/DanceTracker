import React from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import CategoryCard from "../components/CategoryCard";
import {images} from "../data/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function Gallery() {
  const tailwind = useTailwind();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={tailwind("flex-1 justify-center items-center py-4 pt-8")}>
          <Text style={tailwind("text-xl font-bold text-center")}>Rutinas de baile</Text>
        </View>
        <CategoryCard images={images} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Gallery;
