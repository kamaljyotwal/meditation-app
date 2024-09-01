import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: any;
    containerStyles?: any;
}

function CustomButton({ onPress, title, textStyles = "", containerStyles = "" }: CustomButtonProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`${containerStyles} bg-white rounded-xl min-h-[62px] justify-center items-center`}
            onPress={onPress}
        >
            <Text className={`${textStyles} font-semibold text-lg`}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton