import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { observer } from "mobx-react";
import { SignInScreen } from "../screens/sign-in-screen";

type AuthNavigatorParamsList = {
  signIn: undefined;
  signUp: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthNavigatorParamsList>();

const AuthNavigator = observer(() => {
  return (
    <Navigator>
      <Screen
        name="signIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
});

export { AuthNavigator };
