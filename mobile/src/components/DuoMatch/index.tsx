import React, { useState } from 'react';
import { Alert, View, Modal, ModalProps, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import * as Clipboard from 'expo-clipboard';

import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';

import { styles } from './styles';
import { THEME } from '../../theme'

import { Heading } from '../Heading';

interface PropsModal extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: PropsModal) {
    const [isCopping, setIsCopping] = useState<boolean>(false);

    async function handleCopyDiscordUser(): Promise<void> {
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Copied Discord', 'Discord successfully copied!');
        setIsCopping(false);
    };

    return (
        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>

                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading
                        title="Let's play!"
                        subtitle="Now just start to play"
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Add in Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordBtn}
                        onPress={handleCopyDiscordUser}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
}