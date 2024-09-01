import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import AFFIRMATION_GALLERY from '@/constants/affirmations-gallery';
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory';
import AppGradient from '@/components/AppGradient';
import { AntDesign } from '@expo/vector-icons';

const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();
    const [affirmation, setAffirmation] = useState<GalleryPreviewData | null>(null);
    const [sentences, setSentences] = useState<string[]>([]);

    useEffect(() => {
        if (itemId) {
            for (let i = 0; i < AFFIRMATION_GALLERY.length; i++) {
                const category = AFFIRMATION_GALLERY[i].data;
                const foundAffirmation = category.find(item => item.id === Number(itemId));
                if (foundAffirmation) {
                    setAffirmation(foundAffirmation);
                    const affArray = foundAffirmation.text.split('.');
                    if (affArray[affArray.length - 1] === '') {
                        affArray.pop();
                    }
                    setSentences(affArray);
                    return;
                }
            }
        }
    }, [])

    return (
        <View className='flex-1'>
            <ImageBackground
                source={affirmation?.image}
                className='flex-1'
                resizeMode='cover'
            >
                <AppGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}>
                    <Pressable onPress={() => router.back()}>
                        <AntDesign name="leftcircleo" size={30} color="white"
                            className='absolute top-16 left-6 z-10' />
                    </Pressable>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className='mt-4'
                    >
                        <View className='h-full justify-center'>
                            <View className='h-4/5 justify-center'>
                                {sentences.map((i, index) => (
                                    <Text key={index} className='text-white mb-10 text-2xl font-bold text-center'>
                                        {i}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                </AppGradient>
            </ImageBackground>

        </View>
    )
}

export default AffirmationPractice