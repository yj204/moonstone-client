import { format } from "date-fns";
import { Image, Text, View } from "react-native";
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
  const opacity = useSharedValue(0)
  const offset = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(()=>({
    opacity:  opacity.value,
    transform:[
      {
        translateY: withTiming(offset.value)
      }
    ]
  }))
  return (
    // <></>
    <Animated.View 
    // style = {animatedStyle} 
      className="mb-8"
    >
      <Text>{image}</Text>
      <Text className="text-gray-500 text-sm mb-2">
        {format(
          typeof date === "string" ? new Date(date) : date,
          "yyyy년 M월 d일"
        )}
      </Text>

      <View className="rounded-xl overflow-hidden shadow-md">
        <Image style={{width:300,height:300}} source={{uri:image}} className="w-full h-64" resizeMode="cover" />
      </View>

      {caption ? (
        <Text className="text-gray-700 mt-2 text-sm">{caption}</Text>
      ) : null}
    </Animated.View>
  );
};

// export const  TimelineItem;
