import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import CategoryCard from "../components/CategoryCard";
import { images } from "../data/constants";
import WarningModal from "../components/WarningModal";
import useProfileData from "../hooks/useProfileData";
import { useAuth } from "../contexts/authContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function Gallery() {
  const tailwind = useTailwind();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoading, error, profileData } = useProfileData(user);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={tailwind("flex-1 justify-center items-center")}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={tailwind("text-center text-xl mt-4")}>Cargando...</Text>
        </View>
      ) : (
        <>
          <ScrollView>
            <View
              style={tailwind("flex-1 justify-center items-center py-4 pt-8")}
            >
              <Text style={tailwind("text-xl font-bold text-center")}>
                Rutinas de baile
              </Text>
            </View>
            <CategoryCard images={images} />
          </ScrollView>
          <WarningModal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            classification={profileData.classification}
          />
        </>
      )}
    </SafeAreaView>
  );
}

export default Gallery;
