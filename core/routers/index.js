import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import {toastConfig} from '../../components/molecules/Toast';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {Welcome} from '../../components/screens/Auth/Welcome';
import {Login} from '../../components/screens/Auth/Login';
import { ProfileStackNavigation } from './ProfileNavigation';

const RootNavigations = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const AuthStack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        {isAuthenticated && <>
            <ProfileStackNavigation/>
        </>}

        {!isAuthenticated && (
          <>
            <AuthStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <AuthStack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                  animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
                }}
              />
              <AuthStack.Screen
                name="Login"
                component={Login}
                options={{
                  animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
                }}
              />
            </AuthStack.Navigator>
          </>
        )}
      </NavigationContainer>
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default RootNavigations;
