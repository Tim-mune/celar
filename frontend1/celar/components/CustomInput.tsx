import React from "react";
import { Controller, FieldErrors } from "react-hook-form";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
  control: any;
  errors: FieldErrors<any>;
  name: string;
}

export const Input = ({
  control,
  errors,
  name,
  ...textInputProps
}: InputProps) => {
  return (
    <View className="mb-4  gap-1">
      <Text className="self-start text-[12px]  capitalize text-primary-500">
        {name}
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType="email-address"
            className="border-[2px] h-[48px] px-4 font-body_regular text-[12px]  border-neutral-500 w-full rounded-[8px]"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...textInputProps}
          />
        )}
        name={name}
      />
      {errors[name] && (
        <Text className="text-error self-start">{name} is required.</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
