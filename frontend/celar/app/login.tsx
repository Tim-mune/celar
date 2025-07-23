import Input from "@/components/CustomInput";
import { useLogin } from "@/hooks/apphooks";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AuthData {
  email: string;
  password: string;
}
const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin();
  const onSubmit = (data: AuthData) => {
    mutate({ email: data.email, password: data.password });
  };
  return isPending ? (
    <ActivityIndicator />
  ) : (
    <View className="flex-1 bg-white p-[24px] gap-2">
      <Text className="text-4xl font-bold ">login</Text>
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder={`your registered email`}
        control={control}
        errors={errors}
        name="email"
        key={"email"}
      />
      <Input
        keyboardType="numbers-and-punctuation"
        autoCapitalize="none"
        secureTextEntry
        placeholder={`your password`}
        control={control}
        errors={errors}
        name="password"
        key={"password"}
      />
      <TouchableOpacity
        className="self-center"
        onPress={() => router.navigate("/signup")}
      >
        <Text className="text-xl font-bold">
          Dont have an account? Sign up here
        </Text>
      </TouchableOpacity>
      <Button title="Continue" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
