import { SafeAreaView, View, Text, FlatList } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [userData, setUserData] = useState({});
  async function getData() {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    axios
      .post("http://192.168.3.37:8082/userdata", { token: token })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.data);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView className="bg-[#06141b] flex-1">
      <View className="my-6 px-4 space-y-6">
        <View className="justify-between item-start flex-row mb-6">
          <View>
            <Text className="text-[#ccd0cf] mt-10 text-sm">Wellcome back</Text>
            <Text className="text-white font-semibold">
              {userData.username}
            </Text>
          </View>
        </View>
      </View>
      <View className="justify-center item-center flex-row mb-6">
        <Card
          wrapperStyle={{ alignItems: "center" }}
          containerStyle={{ height: "100%", width: "80%" }}
        >
          <Card.Title>Account type</Card.Title>
          <Card.Divider />
          <Text>Balance:0.0</Text>
        </Card>
      </View>
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
        keyExtractor={(item) => item.$id}
        horizontal={true}
        renderItem={({ item }) => (
          <Card
            wrapperStyle={{ alignItems: "center" }}
            containerStyle={{ height: "25%" }}
          >
            <Card.Title>Account type {item.id}</Card.Title>
            <Card.Divider />
            <Text>Balance:0.0</Text>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
