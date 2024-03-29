import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shopping List",
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="rule-folder" color={color} />
          ),
          // headerRight: () => <AddListModal />,
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          title: "Single List",
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="checklist" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meal"
        options={{
          title: "Meal Plan",
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="edit-calendar" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
