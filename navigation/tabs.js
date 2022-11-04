import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { Home, Feeds, Catalog, Me, Login } from "../screens";
import { COLORS, FONTS, icons, SIZES } from "../constant";

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.releases}
              resizeMode="contain"
              style={{
                height: 31,
                width: 31,
                tintColor: focused ? "red" : COLORS.gray,
              }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Catalog"
        component={Catalog}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.catalog}
              resizeMode="contain"
              style={{
                height: 42,
                width: 42,
                tintColor: focused ? "red" : COLORS.gray,
              }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Me"
        component={Me}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.profile}
              resizeMode="contain"
              style={{
                height: 32,
                width: 32,
                tintColor: focused ? "red" : COLORS.gray,
              }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default Tabs;
