import { Text, View, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";

const FavoritesPage = () => {
    const tailwind = useTailwind();
    
    return (
        <ScrollView style={tailwind("flex")}>
        <View style={tailwind("flex items-center mt-8")}>
            <Text style={tailwind("text-2xl font-bold")}>Favoritos</Text>
        </View>
        </ScrollView>
    );
    }

export default FavoritesPage;
