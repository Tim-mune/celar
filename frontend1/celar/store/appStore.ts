import { axiosInstance } from "@/axios/axiosInstance";
import { create } from "zustand";

export type User = {
  id: string;
  email: string;
  password: string;
  role: "psp" | "dev";
  balance: number;
};

type Transaction = {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  userId: string;
  recipientId: string;
  user: User;
  recipient: User;
};

interface AppStore {
  user: User | null;
  setUser: (user: User) => void;
  login: (data: {
    email: string;
    password: string;
  }) => Promise<{ message: string; token: string; user: User }>;
  signup: (data: {
    role: string;
    email: string;
    password: string;
  }) => Promise<unknown>;
  send: (data: {
    recipient: string;
    amount: number;
    currency: string;
  }) => Promise<{
    user: User;
    transaction: Transaction;
    balance: number;
    loanLimit: number;
    message: string;
  }>;
  getTransactions: () => Promise<{ transactions: Transaction[] }>;
  getUsers: () => Promise<User[]>;
}

export const useAppState = create<AppStore>((set) => ({
  user: null,
  setUser(user) {
    set({ user });
  },
  async getTransactions() {
    try {
      const response = await axiosInstance.get("transactions");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async login(data) {
    try {
      const response = await axiosInstance.post("login", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async send(data) {
    try {
      const response = await axiosInstance.post("send", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async signup(data) {
    try {
      const response = await axiosInstance.post("signup", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getUsers() {
    try {
      const response = await axiosInstance.get("users");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}));
