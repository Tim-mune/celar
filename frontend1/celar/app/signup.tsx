import Input from "@/components/CustomInput";
import colors from "@/constants/Colors";
import { useSignup } from "@/hooks/apphooks";
import Checkbox from "expo-checkbox";
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
  role: string;
}
const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  const { mutate, isPending } = useSignup();
  const onSubmit = (data: AuthData) => {
    mutate({
      email: data.email,
      password: data.password,
      role: isChecked ? "dev" : "psp",
    });
  };

  const [isChecked, setChecked] = React.useState(false);
  return isPending ? (
    <ActivityIndicator />
  ) : (
    <View className="flex-1 bg-white p-[24px] gap-2">
      <Text className="text-4xl font-bold ">Sign up</Text>
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
      <View className="gap-2">
        <Text>Role</Text>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? colors.primary : colors.warning}
        />
        <Text>
          Are you a dev? by checking here you agree to a dev role by leaving it
          blank you agree to a psp role
        </Text>
      </View>
      <TouchableOpacity
        className="self-center"
        onPress={() => router.navigate("/login")}
      >
        <Text className="text-xl font-bold">
          Already have an account?Login here
        </Text>
      </TouchableOpacity>

      <Button title="Continue" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
