import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const styles = StyleSheet.create({
    footerText: {
        fontSize: 16,
        color: '#2e2e2d',
    },
    footerLink: {
        color: '#788eec',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

function Home() {

  const onFooterLinkPress = () => {
    try {
      signOut(auth);
    } catch (error) {
      console.log("Error logging out:", error.message);
    }
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Working on home page</Text>
          <Text styles={styles.footerText}>
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log Out</Text>
          </Text>
      </View>
    </>
  );
}

export default Home;
