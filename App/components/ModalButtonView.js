import React from 'react';
import {StyleSheet, View} from 'react-native';
import {color} from 'react-native-reanimated';
//custom imports
import {colors, height, width} from '../config/globalStyles';

import {ModalButton} from './ModalButton';
import {useSelector, useDispatch} from 'react-redux';
import {selectToken, getReserveData} from '../reducer/userSlice';
import parkingAPI from '../api/parking';

import {
  selectSeatSector,
  selectSeatNumber,
  selectSeat,
  setTime,
} from '../reducer/parkingSlice';

export const ModalButtonView = ({
  onPress,
  setRefreshCount,
  setVisibleModal,
}) => {
  const token = useSelector(selectToken);
  const sector = useSelector(selectSeatSector);
  const number = useSelector(selectSeatNumber);
  // const reserveSeat = useSelector(reserveSeat);
  const dispatch = useDispatch();
  let reserveEndTime = new Date();
  reserveEndTime.setMinutes(reserveEndTime.getMinutes() + 5);
  let hours = reserveEndTime.getHours(); // 시
  let minutes = reserveEndTime.getMinutes(); // 분
  let seconds = reserveEndTime.getSeconds(); // 분
  console.log('예약종료시간은', seconds);

  const fiveReserve = async () => {
    const response = await parkingAPI.reserveSeat(token, sector, number);
    if (response.status === 200) {
      dispatch(setTime({hour: hours, minute: minutes}));
      setRefreshCount(prev => prev + 1);
      setVisibleModal(false);
      console.log(hours, '시', minutes, '분');
    }
  };

  const zzimSeat = async () => {
    const response = await parkingAPI.registerPush(token, sector, number);
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
        onPress={zzimSeat}
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
