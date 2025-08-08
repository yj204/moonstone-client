import { TimelineItem } from "@/components/TimelineItem";
import { format, startOfDay } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  Text,
  View
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

type Props = {
  data: {
    id: number | string;
    date: Date | string;
    image: string;
    caption?: string;
  }[];
};

type GroupedData = {
  [key: string]: Props["data"];
};

type TimelineSection = {
  date: string;
  items: Props["data"];
};

export const Timeline = ({ data }: Props) => {
  // 날짜별로 그룹화하고 정렬된 섹션 배열 생성
  const timelineSections = useMemo(() => {
    const groupByDate = data.reduce((acc, curr) => {
      const dateKey =
        typeof curr.date === "string"
          ? startOfDay(new Date(curr.date)).toISOString()
          : startOfDay(curr.date).toISOString();

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(curr);
      return acc;
    }, {} as GroupedData);

    return Object.entries(groupByDate)
      .map(([date, items]) => ({
        date,
        items: items.sort((a, b) => {
          const dateA = typeof a.date === "string" ? new Date(a.date) : a.date;
          const dateB = typeof b.date === "string" ? new Date(b.date) : b.date;
          return dateA.getTime() - dateB.getTime();
        }),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 최신 날짜가 위로
  }, [data]);
  console.log("timeline section", timelineSections);
  const [contentWidth, setContentWidth] = useState(0);

  const numColumns = 3;

  const GAP = 8;
  const itemStyle = useMemo(() => {
    if (!contentWidth)
      return {
        width: 0,
        marginRight: 8,
        marginBottom: 8,
      };
    // 행당 (N-1)개의 갭을 뺀 뒤 균등 분배
    const width = Math.floor(
      (contentWidth - GAP * (numColumns - 1)) / numColumns
    );
    return {
      width,
      marginRight: 8,
      marginBottom: 8,
    };
  }, [contentWidth]);

  const renderSection = useCallback(
    ({ item: section }: { item: TimelineSection }) => (
      <View className="mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-3 px-2">
          {format(new Date(section.date), "yyyy년 M월 d일")}
        </Text>
        <View className="px-2">
          <FlatList
            onLayout={(e: LayoutChangeEvent) => {
              console.log("on loayout ", e.nativeEvent.layout);
              setContentWidth(e.nativeEvent.layout.width);
            }}
            data={section.items}
            renderItem={({ item: timelineItem, index }) => (
              <View style={itemStyle}>
                <TimelineItem
                  date={timelineItem.date}
                  caption={timelineItem.caption}
                  image={timelineItem.image}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    ),
    [itemStyle]
  );

  return (
    <View className="flex-1 px-2 py-6 bg-white">
      <FlatList
        data={timelineSections}
        keyExtractor={(item) => item.date}
        renderItem={renderSection}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={7}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
