import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import logo from "../assets/images/logo.png";

export default function App() {
  return (
    <SafeAreaView className="bg-[#06141b] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-center items-center min-h-[50vh] px-4">
          <Image
            source={logo}
            className="w-[200px] h-[150px]"
            resizeMode="contain"
          />
        </View>
        <View className="relative -m-10">
          <Text className="text-[#ccd0cf] font-bold text-center mb-5">
            Wellcome to Imam Finance
          </Text>
          <CustomButton
            title={"Countine with email "}
            onPress={() => router.push("/sign-in")}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}

//"#ccd0cf"
//"#06141b"
