import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import beachImage from '@/assets/meditation-images/beach.webp'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/CustomButton'
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

export default function HomeScreen() {
  // vars
  const router = useRouter()

  return (
    <>
      <View className="flex-1">
        <ImageBackground
          source={beachImage}
          className="flex-1"
          resizeMode="cover"
        >
          <AppGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}>

            <SafeAreaView className="flex-1 px-1 justify-between">
              <View>
                <Text className="mt-20 text-center text-white font-bold text-4xl">
                  Simple Meditation
                </Text>
                <Text className="mt-10 text-center text-white text-regular text-xl">
                  Declutter your mind,
                </Text>
                <Text className="mt-1 text-center text-white text-regular text-xl">
                  Simplify your life.
                </Text>
              </View>

              <CustomButton
                onPress={() => { router.push('/nature-meditate') }}
                title="Get Started"
              />
              <StatusBar style="light" />
            </SafeAreaView>
          </AppGradient>
        </ImageBackground>
      </View>
    </>
  );
}
