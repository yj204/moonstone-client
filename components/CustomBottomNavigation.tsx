import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

// 각 탭에 해당하는 컴포넌트들
const AlbumsRoute = () => (
  <View style={styles.container}>
    <Text>앨범 페이지</Text>
  </View>
);

const FeedingRoute = () => (
  <View style={styles.container}>
    <Text>수유 페이지</Text>
  </View>
);

const CustomBottomNavigation = () => {
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

  const renderScene = BottomNavigation.SceneMap({
    albums: AlbumsRoute,
    feeding: FeedingRoute,
  });

  const handleIndexChange = (newIndex: number) => {
    setIndex(newIndex);
    
    // Expo Router를 사용하여 실제 페이지 이동
    switch (newIndex) {
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

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
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
  },
});

export default CustomBottomNavigation;
