import React, { useState }  from 'react';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity
 } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { theme } from '../../theme';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { FeedbackType } from '../Widget';
import { Screenshot } from '../Screenshot';
import { Button } from '../Button';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }:Props) {
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        }).then(
            (uri) => setScreenshot(uri)
        ).catch((error) => console.log(error));
    }

    function handleScreenshotRemove() {
        setScreenshot(null)
    }

    async function handleSendFeedback() {
        if (loading) {
            return;
        }
        setLoading(true);
        const screenshotBase64 = screenshot && FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

        try {
            await api.post('/feedbacks', { 
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment: comment,
            });
            onFeedbackSent();
        } catch(error) {
            console.log(error);
            setLoading(false);
        }

    }

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCanceled}>
                <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Image source={feedbackTypeInfo.image} style={styles.image} />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>
        <TextInput multiline style={styles.input} placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..." placeholderTextColor={theme.colors.text_secondary} autoCorrect={false} onChangeText={setComment}/>
        <View style={styles.footer}>
            <Screenshot onTakeShot={() => handleScreenshot()} onRemoveShot={() => handleScreenshotRemove()} screenshot={screenshot} />
            <Button isLoading={loading} handleSendFeedback={handleSendFeedback} />
        </View>
    </View>
  );
}