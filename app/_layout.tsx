import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from 'redux'
import { reducers } from "@/store";
import "./global.css"

const store = createStore(reducers)

const Main = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
