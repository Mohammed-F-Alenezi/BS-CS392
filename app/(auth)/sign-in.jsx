import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import logo from "../../assets/images/logo.png";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    const userData = {
      email: form.email,
      password: form.password,
    };
    setIsSubmitting(true);
    try {
      axios.post("http://192.168.3.37:8082/sign-in", userData).then((res) => {
        if (res.data.status === "ok") {
          AsyncStorage.setItem("token", res.data.data);
          router.replace("/home");
        } else {
          console.log(res.data);
          Alert.alert("Error", "User doesn't exists");
        }
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#06141b] h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6 ">
          <View className="items-center">
            <Image
              source={logo}
              className="w-[200px] h-[150px] "
              resizeMode="contain"
            />
          </View>

          <Text className="text-base text-[#ccd0cf] font-medium mt-10">
            Log in to Imam Finance
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="sign-in"
            onPress={submit}
            containerStyle="mt-20"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-[#ccd0cf]">
              Don't have an Account ?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-semibold text-[#9ba8ab]"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
