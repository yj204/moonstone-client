import { format, startOfDay } from "date-fns";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  Modal,
  Platform,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import type { CarouselRenderItem } from "react-native-reanimated-carousel";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { TimelineImage } from "./AlbumImage";

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

export const AlbumTimeline = ({ data }: Props) => {
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const GAP = Platform.OS == "web" ? 8 : 4;
  const itemStyle = useMemo(() => {
    if (!contentWidth)
      return {
        width: 0,
        marginRight: GAP / 2,
        marginLeft: GAP / 2,
        marginBottom: GAP,
        class: `max-w-[0]`,
      };
    // 행당 (N-1)개의 갭을 뺀 뒤 균등 분배
    const width = Math.floor(
      (contentWidth - GAP * (numColumns - 1)) / numColumns,
    );
    return {
      width,
      marginRight: GAP / 2,
      marginLeft: GAP / 2,
      marginBottom: GAP,
    };
  }, [contentWidth, GAP, numColumns]);

  const flatItems = useMemo(
    () =>
      timelineSections.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
        })),
      ),
    [timelineSections],
  );

  const idToIndex = useMemo(() => {
    const map = new Map<string, number>();
    flatItems.forEach((item, index) => {
      map.set(item.id.toString(), index);
    });
    return map;
  }, [flatItems]);

  const renderSection = useCallback(
    ({ item: section }: { item: TimelineSection }) => (
      <ThemedView className="mb-6 w-full">
        <ThemedText className="mb-3 px-2 text-lg font-semibold">
          {format(new Date(section.date), "yyyy년 M월 d일")}
        </ThemedText>
        <View className="w-full" style={{ paddingHorizontal: GAP / 2 }}>
          <FlatList
            extraData={itemStyle}
            onLayout={(e: LayoutChangeEvent) => {
              console.log("on loayout ", e.nativeEvent.layout);
              setContentWidth(e.nativeEvent.layout.width);
            }}
            data={section.items}
            renderItem={({ item: timelineItem, index }) => (
              <ThemedView
                className={`flex`}
                style={{
                  width: itemStyle.width,
                  maxWidth: itemStyle.width,
                  marginRight: itemStyle.marginRight,
                  marginLeft: itemStyle.marginLeft,
                  marginBottom: itemStyle.marginBottom,
                }}
              >
                <TimelineImage
                  date={timelineItem.date}
                  caption={timelineItem.caption}
                  image={timelineItem.image}
                  onPress={() => {
                    const index = idToIndex.get(timelineItem.id.toString());
                    if (index !== undefined) {
                      setLightboxIndex(index);
                    }
                  }}
                />
              </ThemedView>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ThemedView>
    ),
    [idToIndex, itemStyle],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const renderLightbox = () => (
    <Modal
      animationType="fade"
      visible={lightboxIndex !== null}
      transparent
      onRequestClose={closeLightbox}
    >
      <View className="flex-1 bg-black/90">
        <Pressable
          className="absolute inset-0"
          onPress={closeLightbox}
          pointerEvents="box-none"
        />
        <Pressable
          className="absolute right-4 top-12 z-50 rounded-full bg-black/60 p-2"
          onPress={closeLightbox}
          hitSlop={8}
        >
          <Ionicons name="close" size={24} color="white" />
        </Pressable>
        {lightboxIndex !== null && (
          <Carousel
            width={windowWidth}
            height={windowHeight}
            data={flatItems}
            defaultIndex={lightboxIndex}
            loop={false}
            onSnapToItem={(index: number) => {
              if (index !== lightboxIndex) {
                setLightboxIndex(index);
              }
            }}
            renderItem={(({ item }: { item: Props["data"][number] }) => (
              <View className="h-full w-screen items-center justify-center">
                <Pressable
                  className="h-full w-full items-center justify-center"
                  onPress={() => {}}
                >
                  <Image
                    source={{ uri: item.image }}
                    className="h-full w-full"
                    resizeMode="contain"
                  />
                  {item.caption && (
                    <View className="absolute bottom-10 px-6">
                      <ThemedText className="text-center text-white">
                        {item.caption}
                      </ThemedText>
                    </View>
                  )}
                </Pressable>
              </View>
            )) as CarouselRenderItem<Props["data"][number]>}
          />
        )}
      </View>
    </Modal>
  );

  return (
    <>
      <ThemedView className="w-full flex-1 px-2 py-6">
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
      </ThemedView>
      {renderLightbox()}
    </>
  );
};
