import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import AFFIRMATION_GALLERY from '@/constants/affirmations-gallery'
import GuidedAffirmationsGallery from '@/components/GuidedAffirmationsGallery'

const affirmations = () => {
    return (
        <View className='flex-1'>
            <AppGradient colors={['#281f58', '#54426b', "#a790a5"]}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className='text-3xl font-bold text-zinc-50'>
                        Change your beliefs with affirmations
                    </Text>

                    <View>
                        {AFFIRMATION_GALLERY.map((category) => (
                            <GuidedAffirmationsGallery
                                key={category.title}
                                title={category.title}
                                previews={category.data}
                            />
                        ))}
                    </View>
                </ScrollView>
            </AppGradient>

        </View>
    )
}

export default affirmations