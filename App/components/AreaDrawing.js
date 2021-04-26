import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
//custom imports
import {colors, height, width} from '../config/globalStyles';
import {ParkingSeat} from './ParkingSeat';

export const AreaDrawing = ({drawingData, children, ...props}) => {
  return (
    <View style={styles.drawingView}>
      {drawingData &&
        drawingData.map(item => (
          <ParkingSeat
            enable={item.enable}
            seatNumber={item.parkingSeat}
            key={item.parkingSeat}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  drawingView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.parkingBackground,
    padding: width * 50,
  },
});
