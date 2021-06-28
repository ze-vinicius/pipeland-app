import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { observer } from "mobx-react";
import { SignInScreen } from "../screens/sign-in-screen";
import {
  SignUpFirstStepScreen,
  SignUpSecondStepScreen,
} from "../screens/sign-up-screen";

type AuthNavigatorParamsList = {
  signIn: undefined;
  signUpFirstStep: undefined;
  signUpSecondStep: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthNavigatorParamsList>();

const AuthNavigator = observer(() => {
  return (
    <Navigator>
      <Screen
        name="signIn"
        component={SignInScreen}
        options={{ headerShown: false, title: "Entrar" }}
      />

      <Screen
        name="signUpFirstStep"
        component={SignUpFirstStepScreen}
        options={{ headerShown: true, title: "Criar conta" }}
      />
      <Screen
        name="signUpSecondStep"
        component={SignUpSecondStepScreen}
        options={{ headerShown: true, title: "Criar conta" }}
      />
    </Navigator>
  );
});

export { AuthNavigator };
