import Input from "@/components/CustomInput";
import { useGetUsers, useSendTransaction } from "@/hooks/apphooks";
import { toast } from "@backpackapp-io/react-native-toast";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
type FormData = {
  amount: string;
  currency: string;
};

const Send = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { mutate, isPending } = useSendTransaction();
  const [recipient, setRecipient] = useState<string>("");

  const onSubmit = (data: FormData) => {
    console.log("data", data);
    if (!recipient) {
      toast.error("Please select a recipient");
    }
    mutate({
      amount: Number(data.amount),
      currency: data.currency.toUpperCase(),
      recipient: recipient,
    });
  };

  const { data, isLoading } = useGetUsers();

  return isPending ? (
    <ActivityIndicator />
  ) : (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-primary mb-6">
        Send Transaction
      </Text>

      <Input
        keyboardType="numeric"
        placeholder="Amount to send"
        control={control}
        errors={errors}
        name="amount"
        key={"amount"}
      />

      <Input
        keyboardType="default"
        placeholder="currency eg KES"
        control={control}
        errors={errors}
        name="currency"
        key={"currency"}
      />
      <TouchableOpacity>
        <Text className="text-gray">Select Recipient</Text>
      </TouchableOpacity>
      <View className="mt-4  border border-gray rounded-lg overflow-hidden">
        <Picker
          selectedValue={data && data[0]?.id}
          onValueChange={(itemValue, itemIndex) => setRecipient(itemValue)}
        >
          {data?.map((item) => {
            return (
              <Picker.Item key={item.id} label={item.email} value={item.id} />
            );
          })}
        </Picker>
      </View>

      <TouchableOpacity
        className="mt-6 bg-primary py-3 rounded-xl items-center"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white font-medium text-base">Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Send;
