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
import categories from "../data/constants";

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
        <View style={tailwind("flex-row px-8 pt-8 justify-between")}>
          <Text style={tailwind("text-lg font-bold")}>Categorias</Text>
        </View>
        <CategoryCard categories={categories} />
      {/* <VideoPlayer /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Gallery;
