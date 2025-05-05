import React from 'react';
import { View } from 'react-native';
import { GlowingWave } from '../../molecules';

const ParticipantScreen = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <GlowingWave image={require('../../../../public/user/avatar-user-02.png')} />
    </View>
  );
};

export default ParticipantScreen;
