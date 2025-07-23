import { useGetTransactions } from "@/hooks/apphooks";
import { useAppState } from "@/store/appStore";
import { router } from "expo-router";
import moment from "moment";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const userName = "Timo"; // mockup placeholder
  const balance = 1250.75;
  const { user } = useAppState();
  const { data, isLoading } = useGetTransactions();

  return (
    <View className="flex-1 bg-white p-6">
      <View className="mb-6">
        <Text className="text-2xl font-semibold text-gray">Welcome back,</Text>
        <Text className="text-3xl font-bold text-primary mt-1">
          {user?.email}
        </Text>
      </View>

      <View className="bg-primary p-5 rounded-xl mb-8 shadow-sm">
        <Text className="text-white text-sm">Current Balance</Text>
        <Text className="text-white text-3xl font-semibold mt-2">
          ${user?.balance.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/dashboard/send")}
        className="bg-primary py-3 rounded-xl items-center"
      >
        <Text className="text-white text-base font-medium">
          Send Transaction
        </Text>
      </TouchableOpacity>
      <Text className="text-xl font-semibold my-4">Your Transactions</Text>

      {isLoading ? (
        <Text className="text-gray ">Processing...</Text>
      ) : (
        <FlatList
          data={data?.transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View className="mb-4 border border-gray/20 rounded-lg p-4">
                <Text className="text-base font-medium text-primary">
                  To: {item.recipient.email}
                </Text>
                <Text className="text-sm text-gray mt-1">
                  Amount: {item.amount} {item.currency}
                </Text>
                <Text className="text-xs text-gray mt-1">
                  Sent: {moment(item.timestamp).format("MMM D, YYYY • h:mm A")}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Index;
