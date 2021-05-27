import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

//custom imports
import {colors, width, height} from '../config/globalStyles';

import MyIcon from '../config/Icon-font.js';

const PushListHeader = ({zzimSeat, zzimNumber, ...props}) => {
  return (
    <View style={styles.pushListHeader}>
      <Text>
        현재 회원님은 <Text style={styles.strong}>{zzimSeat}</Text>의{' '}
        <Text style={styles.strong}>{zzimNumber}</Text>번 자리를 찜하셨습니다.
      </Text>
      <MyIcon
        name={'alarm-4'}
        size={width * 7}
        style={{
          transform: [{rotate: '90deg'}],
        }}
        color={colors.borderGrey}
      />
    </View>
  );
};

export default PushListHeader;

const styles = StyleSheet.create({
  pushListHeader: {
    width: '100%',
    paddingVertical: width * 15,
    paddingHorizontal: width * 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  strong: {
    fontWeight: '600',
    color: colors.primary,
  },
});
