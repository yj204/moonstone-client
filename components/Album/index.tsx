import { format, startOfDay } from "date-fns";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  LayoutChangeEvent,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
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
  const { width: windowWidth } = useWindowDimensions();
  const lightboxListRef = useRef<FlatList<Props["data"][number]>>(null);

  const GAP = Platform.OS == "web" ? 8 :4 ;
  const itemStyle = useMemo(() => {
    if (!contentWidth)
      return {
        width: 0,
        marginRight: GAP / 2,
        marginLeft: GAP / 2,
        marginBottom: GAP,
        class: `max-w-[0]`
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

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: windowWidth,
      offset: windowWidth * index,
      index,
    }),
    [windowWidth],
  );

  const handleLightboxScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
      if (!Number.isNaN(nextIndex) && nextIndex !== lightboxIndex) {
        setLightboxIndex(nextIndex);
      }
    },
    [lightboxIndex, windowWidth],
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
          className="absolute left-4 top-16 z-10 rounded-full bg-black/60 px-4 py-2"
          onPress={closeLightbox}
          hitSlop={16}
        >
          <ThemedText className="text-white">닫기</ThemedText>
        </Pressable>
        {lightboxIndex !== null && (
          <FlatList
            ref={lightboxListRef}
            horizontal
            pagingEnabled
            data={flatItems}
            keyExtractor={(item) => item.id.toString()}
            initialScrollIndex={lightboxIndex}
            getItemLayout={getItemLayout}
            onMomentumScrollEnd={handleLightboxScroll}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="h-full w-screen items-center justify-center">
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
              </View>
            )}
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
