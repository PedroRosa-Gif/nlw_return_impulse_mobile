import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import sucessImage from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

interface Props {
    onSendAnotherFeedback: () => void;
}

export function Sucess({ onSendAnotherFeedback }:Props) {
  return (
    <View style={styles.container}>
        <Image source={sucessImage} style={styles.image} />
        <Text style={styles.title}>
            Agradeçemos o feedback
        </Text>
        <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
            <Text style={styles.buttonTitle}>
                Quero enviar outro
            </Text>
        </TouchableOpacity>
        <Copyright />
    </View>
  );
}