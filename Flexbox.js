import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function LayoutFigure1711() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.box}><Text style={styles.text}>#1</Text></View>
          <View style={styles.box}><Text style={styles.text}>#2</Text></View>
          <View style={styles.box}><Text style={styles.text}>#5</Text></View>
          <View style={styles.box}><Text style={styles.text}>#6</Text></View>
          <View style={styles.box}><Text style={styles.text}>#9</Text></View>
          <View style={styles.box}><Text style={styles.text}>#10</Text></View>
        </View>

        <View style={styles.column}>
          <View style={styles.box}><Text style={styles.text}>#3</Text></View>
          <View style={styles.box}><Text style={styles.text}>#4</Text></View>
          <View style={styles.box}><Text style={styles.text}>#7</Text></View>
          <View style={styles.box}><Text style={styles.text}>#8</Text></View>
          <View style={styles.box}><Text style={styles.text}>#11</Text></View>
          <View style={styles.box}><Text style={styles.text}>#12</Text></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: 20,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#d3d3d3',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontWeight: '600',
    color: '#333',
  },
});
