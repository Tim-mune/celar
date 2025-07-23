import { Toasts } from "@backpackapp-io/react-native-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function StackLayout() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <GestureHandlerRootView className="flex-1 bg-white">
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 bg-white">
            <Stack
              screenOptions={{
                header(props) {
                  return (
                    <View className="bg-white px-[48px]self-center  p-[12px]">
                      <TouchableOpacity onPress={() => router.back()}>
                        <Text className="underline">Back</Text>
                      </TouchableOpacity>
                    </View>
                  );
                },
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="signup" />
              <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            </Stack>
            <Toasts />
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
