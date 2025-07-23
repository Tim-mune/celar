import colors from "@/constants/Colors";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.gray,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
        },
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTitleStyle: {
          fontWeight: "700",
          color: colors.primary,
        },
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Home" }} />
      <Drawer.Screen name="send" options={{ title: "Send Money" }} />
    </Drawer>
  );
}
