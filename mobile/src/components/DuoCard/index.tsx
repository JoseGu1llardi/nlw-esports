import { View, TouchableOpacity, Text } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';

export interface DuoCardProps {
  hourEnd: string,
  hourStart: string,
  id: string,
  name: string,
  useVoiceChannel: boolean,
  weekdays: string[],
  yearsPlaying: number,
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Name'
        value={data.name}
      />

      <DuoInfo
        label='Playing time'
        value={`${data.yearsPlaying} anos`}
      />

      <DuoInfo
        label='Availability'
        value={`${data.weekdays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />

      <DuoInfo
        label='Do you accept audio calls?'
        value={data.useVoiceChannel ? 'Yes' : 'No'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={onConnect}
      >
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.btnTitle}>Connect</Text>
      </TouchableOpacity>
    </View>
  );
}