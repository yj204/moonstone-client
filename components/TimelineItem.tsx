import { Image, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { ThemedView} from '@/components/ThemedView'
type Props = {
  date: Date | string;
  image: any;
  caption?: string;
};

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export const TimelineItem = ({ date, image, caption }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const opacity = useSharedValue(0)
  const offset = useSharedValue(20)
  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      {
        translateY: offset.value
      }
    ]
  }))

  useEffect(() => {
    if (imageLoaded) {
      opacity.value = withTiming(1, { duration: 500 })
      offset.value = withTiming(0, { duration: 500 })
    }
  }, [imageLoaded])

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Animated.View 
      style={animatedStyle} 
      className="mb-4"
    >
      <View className="rounded-sm overflow-hidden shadow-md">
        <Image 
          source={{uri:image}} 
          className="w-full aspect-square"
          resizeMode="cover"
          onLoad={handleImageLoad}
        />
      </View>
    </Animated.View>
  );
};
