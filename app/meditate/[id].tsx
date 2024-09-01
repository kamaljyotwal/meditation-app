import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import { TimerContext } from '@/context/TimerContext'

const Meditate = () => {
  // vars
  const { id } = useLocalSearchParams();


  const timerContext = useContext(TimerContext)
  if (!timerContext) {
    throw new Error('TimerContext must be used within a TimerProvider');
  }
  const { duration: secondsRemaining, setDuration } = timerContext;

  // state
  // const [secondsRemaining, setSecondsRemaining] = useState(10)
  const [isMeditating, setIsMeditating] = useState(false)
  const [audioSound, setAudioSound] = useState<Audio.Sound | null>(null)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)


  //Effects
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (secondsRemaining == 0) {
      setIsMeditating(false)
      if (audioSound) {
        audioSound.stopAsync();
        setIsPlayingAudio(false);
      }
      return;
    }
    if (isMeditating) {
      interval = setTimeout(() => {
        setDuration(secondsRemaining - 1)
      }, 1000)
    }
    return () => clearTimeout(interval)
  }, [secondsRemaining, isMeditating, audioSound])

  useEffect(() => {
    return () => {
      setDuration(10)
      if (audioSound) {
        audioSound.stopAsync();
        audioSound.unloadAsync();
      }
    }
  }, [audioSound])

  const formattedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0')
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0')

  // handlers
  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining == 0) setDuration(10);
    setIsMeditating(!isMeditating)
    await toggleSound()
  }

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();
    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true)
    } else {
      await sound.pauseAsync()
      setIsPlayingAudio(false)
    }
  }

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName])
    setAudioSound(sound)
    return sound
  }

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();
    router.push('(modal)/adjust-meditation-duration')
  }


  return (
    <View className='flex-1'>
      <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} className='flex-1' resizeMode='cover'>
        <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>

          <Pressable
            onPress={() => router.back()}
            className='absolute top-10 left-10 z-10'
          >
            <AntDesign name='leftcircleo' size={40} color='white' />
          </Pressable>

          <View className='flex-1 justify-center'>
            <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
              <Text className='text-blue-800 text-3xl font-rmono'>{formattedTimeMinutes}:{formattedTimeSeconds}</Text>
            </View>
          </View>

          <View className='mb-5'>
            <CustomButton title='Adjust Duration' onPress={handleAdjustDuration} />
            <CustomButton title={isMeditating ? 'Stop' : 'Start'} containerStyles='mt-4' onPress={toggleMeditationSessionStatus} />
          </View>

        </AppGradient>
      </ImageBackground>
    </View>
  )
}

export default Meditate