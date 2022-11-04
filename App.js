import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { Product, MyCart, Register, Login } from "./screens";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tabs */}
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Me" component={Tabs} />
        <Stack.Screen name="Catalog" component={Tabs} />

        {/* Screen */}
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default () => {
  return <App />;
};
