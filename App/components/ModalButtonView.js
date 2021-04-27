import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {color} from 'react-native-reanimated';
//custom imports
import {colors, height, width} from '../config/globalStyles';

import {ModalButton} from './ModalButton';
import {useSelector, useDispatch} from 'react-redux';
import {selectToken} from '../reducer/userSlice';
import parkingAPI from '../api/parking';
import {
  reserveSeat,
  selectSeatSector,
  selectSeatNumber,
  clearSeat,
} from '../reducer/parkingSlice';

export const ModalButtonView = ({
  onPress,
  children,
  setRefreshCount,
  setVisibleModal,
  ...props
}) => {
  const token = useSelector(selectToken);
  const sector = useSelector(selectSeatSector);
  const number = useSelector(selectSeatNumber);

  const fiveReserve = async () => {
    const response = await parkingAPI.reserveSeat(token, sector, number);
    console.log(response);
    if (response.status === 200) {
      setRefreshCount(prev => prev + 1);
      setVisibleModal(false);
    }
  };

  return (
    <View style={styles.modalButtonView}>
      <ModalButton
        icon="alarm-1"
        size={18}
        onPress={fiveReserve}
        color={colors.primary}
        title="5분 예약하기"
        style={{marginRight: width * 5}}
      />
      <ModalButton
        icon="alarm-2"
        size={14}
        color={colors.red}
        style={{marginRight: width * 5}}
        title="찜하기"
      />
      <ModalButton
        icon="alarm-6"
        size={20}
        color={colors.primary}
        style={{width: width * 50, height: width * 50}}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalButtonView: {
    position: 'absolute',
    bottom: height * 140,
    right: width * 20,
    alignItems: 'center',
  },
});
