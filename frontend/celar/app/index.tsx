import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View className="flex-1  bg-white justify-evenly p-[24px]">
      <Text className="text-center text-4xl font-bold">Celarr Tech.</Text>
      <View className="h-[60%] w-full">
        <Image
          source={require("../assets/images/landing.png")}
          style={{ width: "100%", height: "100%" }}
          contentFit="contain"
        />
      </View>
      <View>
        <Text className="text-xl text-center text-primary font-black">
          Send money Test{" "}
        </Text>
        <Text className="text-center ">Version 0.0.1</Text>
        <Text className="text-center font-semibold">Dev:Tim</Text>
      </View>

      <Button title="Continue" onPress={() => router.navigate("/login")} />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
