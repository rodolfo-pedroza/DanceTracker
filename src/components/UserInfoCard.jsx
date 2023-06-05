import { Text, View } from "react-native";
import { useEffect } from "react";
import { useTailwind } from "tailwind-rn";
import { Card } from "react-native-paper";
import useFetchUserData from "../hooks/useFetchUserData";
import { useAuth } from "../contexts/authContext";

const UserInfoCard = () => {
  const tailwind = useTailwind();
  const { user } = useAuth();

  const { userData, loading, fetchUserData } = useFetchUserData();
  console.log("userData", userData);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={tailwind("flex-row mt-4 mx-8 justify-between")}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {userData ? (
            <>
              <Card style={tailwind("p-4 rounded-3xl bg-white")}>
                <View style={tailwind("w-16")}>
                  <Text
                    style={tailwind(
                      "text-base font-bold text-indigo-400 text-center"
                    )}
                  >
                    {userData.height} cm
                  </Text>
                  <Text style={tailwind("text-sm text-center")}>Altura</Text>
                </View>
              </Card>
              <Card style={tailwind("p-4 rounded-3xl bg-white")}>
                <View style={tailwind("w-16")}>
                  <Text
                    style={tailwind(
                      "text-base font-bold text-indigo-400 text-center"
                    )}
                  >
                    {userData.weight} kg
                  </Text>
                  <Text style={tailwind("text-sm text-center")}>Peso</Text>
                </View>
              </Card>
              <Card style={tailwind("p-4 rounded-3xl bg-white")}>
                <View style={tailwind("w-16")}>
                  <Text
                    style={tailwind(
                      "text-base font-bold text-indigo-400 text-center"
                    )}
                  >
                    {userData.age} años
                  </Text>
                  <Text style={tailwind("text-sm text-center")}>Edad</Text>
                </View>
              </Card>
            </>
          ) : (
            <Text style={tailwind("text-center text-lg font-bold")}>
              Por favor, complete su información
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default UserInfoCard;
