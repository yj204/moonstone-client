import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, Button, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

const ProgrammaticNavigation = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const [routes] = useState([
    { 
      key: 'albums', 
      title: '앨범', 
      focusedIcon: 'album',
      unfocusedIcon: 'album-outline'
    },
    { 
      key: 'feeding', 
      title: '수유', 
      focusedIcon: 'history',
      unfocusedIcon: 'history'
    },
  ]);

  // 프로그래밍 방식으로 특정 탭으로 이동하는 함수
  const navigateToTab = (tabIndex: number) => {
    setIndex(tabIndex);
    
    // 해당하는 페이지로 라우팅
    switch (tabIndex) {
      case 0:
        router.push('/(album)');
        break;
      case 1:
        router.push('/feeding');
        break;
      default:
        break;
    }
  };

  // 특정 탭으로 직접 이동하는 함수들
  const goToAlbums = () => navigateToTab(0);
  const goToFeeding = () => navigateToTab(1);

  const renderScene = BottomNavigation.SceneMap({
    albums: () => (
      <View style={styles.container}>
        <Text variant="headlineMedium">앨범 페이지</Text>
        <Button 
          mode="contained" 
          onPress={goToFeeding}
          style={styles.button}
        >
          수유 페이지로 이동
        </Button>
      </View>
    ),
    feeding: () => (
      <View style={styles.container}>
        <Text variant="headlineMedium">수유 페이지</Text>
        <Button 
          mode="contained" 
          onPress={goToAlbums}
          style={styles.button}
        >
          앨범 페이지로 이동
        </Button>
      </View>
    ),
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor="#6200ee"
      inactiveColor="#757575"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default ProgrammaticNavigation;
