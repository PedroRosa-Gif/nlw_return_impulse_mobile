import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props extends TouchableOpacityProps {
    isLoading: boolean;
    handleSendFeedback: () => void;
}

export function Button({ isLoading, handleSendFeedback, ...rest }:Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={handleSendFeedback}>
        { isLoading
            ?
            <ActivityIndicator color={theme.colors.text_on_brand_color} {...rest}/>
            :
            <Text style={styles.title}>
                Enviar Feedback
            </Text>
        }
    </TouchableOpacity>
  );
}