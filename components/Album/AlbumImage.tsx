import { useEffect, useState } from "react";
import { Image, Pressable, View } from "react-native";
type Props = {
  date: Date | string;
  image: any;
  caption?: string;
  onPress?: () => void;
};

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const TimelineImage = ({ date, image, caption, onPress }: Props) => {
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
      className=""
    >
      <View className="rounded-sm overflow-hidden shadow-md">
        <Pressable onPress={onPress}>
          <Image
            source={{ uri: image }}
            className="w-full aspect-square"
            resizeMode="cover"
            onLoad={handleImageLoad}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
};
