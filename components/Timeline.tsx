import { FlatList, View } from "react-native";
import { TimelineItem } from "@/components/TimelineItem";

type Props = {
  data: {
    id: number | string;
    date: Date | string;
    image: string;
    caption?: string;
  }[];
};

type GroupedData = {
  [key: string]: Props["data"][];
};

export const Timeline = ({ data }: Props) => {
  const groupByData = data.reduce((acc, curr) => {
    const date =
      curr.date instanceof Date ? curr.date.toISOString() : curr.date;
    if (acc[date] == null || acc[date] == undefined) acc[date] = [];
    acc[date].push(data);
    return acc;
  }, {} as GroupedData);
  
  
  return (
    <View className="flex-1 px-4 py-6 bg-white">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TimelineItem
            date={item.date}
            caption={item.caption}
            image={item.image}
          />
        )}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={7}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
