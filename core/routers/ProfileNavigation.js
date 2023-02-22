import React from "react";
import Profile from "../../components/screens/Profile";
import Notifications from "../../components/screens/Notifications";
import { Device } from "../../components/screens/Devices/Device";
import { HeaderBackButton } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangeState from "../../components/screens/Notifications/ChangeState";
import BottomTabController from "../../components/molecules/BottomTab";
import SettingsScreen from "../../components/screens/Settings";
import DeviceGoogleMaps from "../../components/screens/GoogleMap";
import QRSearchSuccess from "../../components/screens/QRScan/Success";
import DeviceNotFound from "../../components/screens/QRScan/DeviceNotFound";
import EditGPS from "../../components/screens/GoogleMap/EditGPS";
import IncidentReporting from "../../components/screens/Incident";
export const ProfileStackNavigation = () => {
  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name="Dashboard"
        component={BottomTabController}
      />
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Notifications" component={Notifications} />
      <ProfileStack.Screen
        name="Device Maps"
        component={DeviceGoogleMaps}
        options={{
          title: "All devices maps",
        }}
      />
      <ProfileStack.Screen name="Change Status" component={ChangeState} />
      <ProfileStack.Screen
        name="All devices"
        component={Device}
        options={({ navigation }) => ({
          title: "My devices",
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.navigate("Dashboard")}
            />
          ),
        })}
      />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen
        name="QRActivation"
        component={QRSearchSuccess}
        options={{
          headerShown: false,
          title: "Activate  device",
        }}
      />

      <ProfileStack.Screen
        name="DeviceNotFound"
        component={DeviceNotFound}
        options={{
          headerShown: false,
        }}
      />

      <ProfileStack.Screen
        name="EditGPS"
        component={EditGPS}
        options={{
          title: "Edit Location",
        }}
      />
      <ProfileStack.Screen
        name="IncidentReporting"
        component={IncidentReporting}
        options={{
          title: "Declare Incidents",
        }}
      />
    </ProfileStack.Navigator>
  );
};
