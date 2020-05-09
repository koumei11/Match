import React, { useReducer, useEffect, useMemo, useState } from "react";
import { AsyncStorage } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import filterReducer from "./store/reducers/filters";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { signup } from "./auth/Authentication";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./context";

const rootReducer = combineReducers({
  filters: filterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  // return <AuthNavigator />;
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_UP":
          return {
            ...prevState,
            isSignout: false,
            useToken: action.token,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
      }
    },
    { isSignout: false, userToken: null }
  );

  // useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let userToken;

  //     try {
  //       userToken = await AsyncStorage.getItem("userToken");
  //     } catch (e) {
  //       console.log("Login Failed.");
  //     }

  //     dispatch({type: ""})
  //   };
  // });

  const authContext = useMemo(
    () => ({
      // signIn: async data => {
      //   dispatch({type: "SIGN_IN", token: })
      // }
      signUp: async (data) => {
        const userData = await signup(data.email, data.password);
        const token = userData.user.stsTokenManager.accessToken;
        await AsyncStorage("userToken", token);
        dispatch({
          type: "SIGN_IN",
          token: token,
        });
      },
    }),
    []
  );

  const [test, setTest] = useState("This is a test!!!");

  return (
    <AuthContext.Provider value={test}>
      <Provider store={store}>
        <AuthNavigator />
      </Provider>
    </AuthContext.Provider>
  );
}
