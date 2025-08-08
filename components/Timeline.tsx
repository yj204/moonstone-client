import { TimelineItem } from "@/components/TimelineItem";
import { format, max, startOfDay } from "date-fns";
import React, {
  ComponentProps,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  Text,
  View,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { Platform } from "react-native";
import { ThemedText } from "./ThemedText";

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
  const {
    initialNumToRender,
    maxToRenderPerBatch,
    windowSize = 4,
    numColumns = 4,
  } = useMemo(() => {
    let initialNumToRender, maxToRenderPerBatch, windowSize, numColumns;
    switch (Platform.OS) {
      case "web": {
        initialNumToRender = 6;
        maxToRenderPerBatch = 12;
        windowSize = 6;
        numColumns = 6;
        break;
      }
      case "android":
      case "ios": {
        initialNumToRender = 3;
        maxToRenderPerBatch = 6;
        windowSize = 4;
        numColumns = 4;
        break;
      }
    }
    return {
      initialNumToRender,
      maxToRenderPerBatch,
      windowSize,
      numColumns,
    };
  }, []);

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

  const [contentWidth, setContentWidth] = useState(0);

  const GAP = 8;
  const itemStyle = useMemo(() => {
    if (!contentWidth)
      return {
        width: 0,
        marginRight: 2,
        marginBottom: 2,
      };
    // 행당 (N-1)개의 갭을 뺀 뒤 균등 분배
    const width = Math.floor(
      (contentWidth - GAP * (numColumns - 1)) / numColumns
    );
    return {
      width,
      marginRight: 2,
      marginBottom: 2,
    };
  }, [contentWidth]);

  const renderSection = useCallback(
    ({ item: section }: { item: TimelineSection }) => (
      <View className="mb-6 w-full">
        <Text className="text-lg font-semibold mb-3 px-2">
          {format(new Date(section.date), "yyyy년 M월 d일")}
        </Text>
        <View className="px-2 w-full">
          <FlatList
            onLayout={(e: LayoutChangeEvent) => {
              console.log("on loayout ", e.nativeEvent.layout);
              setContentWidth(e.nativeEvent.layout.width);
            }}
            data={section.items}
            renderItem={({ item: timelineItem, index }) => (
              <View className={`w-[${itemStyle.width}px] m-1`}>
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
    [itemStyle.width]
  );

  return (
    <View className="flex-1 px-2 py-6 w-full bg-md-primary">
      <FlatList
        className="w-full"
        data={timelineSections}
        keyExtractor={(item) => item.date}
        renderItem={renderSection}
        initialNumToRender={initialNumToRender}
        maxToRenderPerBatch={maxToRenderPerBatch}
        windowSize={windowSize}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
