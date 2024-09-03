import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { View, Text } from "react-native";
import TimerProvider from "../context/TimerContext";

export default function RootLayout() {
  // @fonts
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  });

  return (
    <>
      {fontsLoaded ? (
        <TimerProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='meditate/[id]' options={{ headerShown: false }} />
            <Stack.Screen name='(modal)/adjust-meditation-duration'
              options={{ headerShown: false, presentation: 'modal' }}
            />
          </Stack>
        </TimerProvider>
      ) : (
        <View>
          <Text>Loading...</Text>
        </View>
      )}
    </>
  );
}