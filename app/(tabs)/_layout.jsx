import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#253745",
          tabBarInactiveTintColor: "#ccd0cf",
          tabBarStyle: {
            backgroundColor: "#06141b",
            borderTopWidth: 1,
            height: 84,
            borderTopColor: "06141b",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="deposit"
          options={{
            title: "Deposit",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="transfer"
          options={{
            title: "Transfer",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="withdarwal"
          options={{
            title: "Withdarwal",
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
