import { useAppState } from "@/store/appStore";
import { toast } from "@backpackapp-io/react-native-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogin = () => {
  const { login, setUser } = useAppState();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess(data, variables, context) {
      toast.success(data.message);
      AsyncStorage.setItem("token", data.token);
      AsyncStorage.setItem("user", JSON.stringify(data.user));
      router.navigate("/dashboard");
      setUser(data.user);
    },
    onError(error, variables, context) {
      console.log("err", error.data);

      toast.error(error?.data.msg);
    },
  });
  return { mutate, isPending };
};
export const useSignup = () => {
  const { signup } = useAppState();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess(data, variables, context) {
      router.navigate("/login");
    },
    onError(error, variables, context) {
      toast.error(error.data.msg);
    },
  });
  return { mutate, isPending };
};
export const useGetTransactions = () => {
  const { getTransactions } = useAppState();
  const { data, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
  return { data, isLoading };
};
export const useGetUsers = () => {
  const { getUsers } = useAppState();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  return { data, isLoading };
};

export const useSendTransaction = () => {
  const { send, setUser } = useAppState();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: send,
    onSuccess(data, variables, context) {
      toast.success(`Transaction sent successfully to ${variables.recipient}`);
      setUser(data.user);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError(error, variables, context) {
      toast.error(error.data.msg);
    },
  });
  return { mutate, isPending };
};
