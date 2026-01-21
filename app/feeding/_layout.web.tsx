import React from "react";
import { Platform, useWindowDimensions, View, Pressable } from "react-native";
import { Button, Text } from "react-native-paper";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { subDays, subHours } from "date-fns";
import TimelineView from "@/components/Timeline";
import FeedingFormDialog from "@/components/FeedingFormDialog";
import DiaperFormDialog from "@/components/DiaperFormDialog";
import { FeedEvent } from "./_layout";
import { usePaperTheme } from "@/theme/paperTheme";

const feedingExample: FeedEvent[] = [
  {
    id: 9,
    date: new Date().toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 8,
    date: subHours(new Date(), 1).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 7,
    date: subHours(new Date(), 2).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 6,
    date: subHours(new Date(), 3).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 5,
    date: subHours(new Date(), 4).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 4,
    date: subHours(subDays(new Date(), 1), 1).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 3,
    date: subHours(subDays(new Date(), 1), 2).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 1,
    date: subHours(subDays(new Date(), 1), 4).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
  {
    id: 2,
    date: subHours(subDays(new Date(), 1), 3).toISOString(),
    type: "feeding",
    amount_ml: 120,
    duration: 15,
    note: "잘 먹었네",
  },
];

export default function WebFeedingLayout() {
  const [events, setEvents] = React.useState<FeedEvent[]>(feedingExample);
  const [formVisible, setFormVisible] = React.useState(false);
  const [diaperFormVisible, setDiaperFormVisible] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<FeedEvent | null>(null);
  const [formMode, setFormMode] = React.useState<"add" | "edit">("add");
  const { width } = useWindowDimensions();
  const theme = usePaperTheme();

  // 웹: 데스크톱/태블릿 반응형 레이아웃
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;

  // 최근 수유 데이터에서 기본값 가져오기
  const latestData = React.useMemo(() => {
    const latestEvent = events.find((e) => e.type === "feeding" && e.amount_ml);
    return {
      amountMl: latestEvent?.amount_ml ?? 120,
      duration: latestEvent?.duration ?? 15,
    };
  }, [events]);

  const handleAddFeeding = (data: Omit<FeedEvent, "id" | "type">) => {
    const newEvent: FeedEvent = {
      id: Date.now(),
      type: "feeding",
      ...data,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleEditFeeding = (data: Omit<FeedEvent, "id" | "type">) => {
    if (editingItem) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingItem.id ? { ...event, ...data } : event
        )
      );
    }
  };

  const handleItemPress = (item: { id: number | string; type?: string }) => {
    const event = events.find((e) => e.id === item.id);
    if (event) {
      setEditingItem(event);
      setFormMode("edit");
      if (event.type === "diaper") {
        setDiaperFormVisible(true);
      } else {
        setFormVisible(true);
      }
    }
  };

  const handleFormDismiss = () => {
    setFormVisible(false);
    setEditingItem(null);
    setFormMode("add");
  };

  const handleFormConfirm = (data: Omit<FeedEvent, "id" | "type">) => {
    if (formMode === "edit") {
      handleEditFeeding(data);
    } else {
      handleAddFeeding(data);
    }
    handleFormDismiss();
  };

  const handleAddDiaper = (
    data: Omit<FeedEvent, "id" | "type"> & { diaperType?: string }
  ) => {
    const newEvent: FeedEvent = {
      id: Date.now(),
      type: "diaper",
      ...data,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleEditDiaper = (
    data: Omit<FeedEvent, "id" | "type"> & { diaperType?: string }
  ) => {
    if (editingItem) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingItem.id ? { ...event, ...data } : event
        )
      );
    }
  };

  const handleDiaperFormDismiss = () => {
    setDiaperFormVisible(false);
    setEditingItem(null);
    setFormMode("add");
  };

  const handleDiaperFormConfirm = (
    data: Omit<FeedEvent, "id" | "type"> & { diaperType?: string }
  ) => {
    if (formMode === "edit") {
      handleEditDiaper(data);
    } else {
      handleAddDiaper(data);
    }
    handleDiaperFormDismiss();
  };

  return (
    <ThemedView className="flex-1">
      {/* 웹 전용: 상단 액션 바 */}
      <View
        style={{
          flexDirection: isDesktop ? "row" : "column",
          alignItems: isDesktop ? "center" : "stretch",
          justifyContent: "space-between",
          paddingHorizontal: isDesktop ? 24 : 16,
          paddingVertical: isDesktop ? 16 : 12,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outline,
          gap: 16,
        }}
      >
        <View style={{ flex: isDesktop ? 1 : 0 }}>
          <ThemedText
            style={{
              fontSize: isDesktop ? 24 : 20,
              fontWeight: "bold",
              colorName: "onSurface",
            }}
          >
            수유 기록
          </ThemedText>
          {isDesktop && (
            <ThemedText
              style={{
                marginTop: 4,
                fontSize: 14,
                colorName: "onSurfaceVariant",
              }}
            >
              총 {events.length}개의 기록
            </ThemedText>
          )}
        </View>

        {/* 웹: 상단 액션 버튼 */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            justifyContent: isDesktop ? "flex-end" : "center",
          }}
        >
          <Button
            mode="contained"
            onPress={() => {
              setFormMode("add");
              setEditingItem(null);
              setFormVisible(true);
            }}
            style={{ minWidth: 120 }}
          >
            수유 추가
          </Button>
          <Button
            mode="contained"
            buttonColor={theme.colors.tertiary}
            textColor={theme.colors.onTertiary}
            onPress={() => {
              setFormMode("add");
              setEditingItem(null);
              setDiaperFormVisible(true);
            }}
            style={{ minWidth: 120 }}
          >
            기저귀 추가
          </Button>
        </View>
      </View>

      {/* 웹: 최대 너비 제한 (데스크톱에서 가독성 향상) */}
      <View
        style={{
          flex: 1,
          maxWidth: isDesktop ? 896 : undefined, // 4xl = 896px
          width: "100%",
          alignSelf: "center",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            paddingHorizontal: isDesktop ? 24 : 16,
            paddingVertical: isDesktop ? 24 : 16,
            flex: 1,
          }}
        >
          <TimelineView events={events} onItemPress={handleItemPress} />
        </View>
      </View>

      <FeedingFormDialog
        visible={formVisible}
        onDismiss={handleFormDismiss}
        onConfirm={handleFormConfirm}
        defaultAmountMl={latestData.amountMl}
        defaultDuration={latestData.duration}
        editingItem={editingItem}
        mode={formMode}
      />
      <DiaperFormDialog
        visible={diaperFormVisible}
        onDismiss={handleDiaperFormDismiss}
        onConfirm={handleDiaperFormConfirm}
        editingItem={editingItem}
        mode={formMode}
      />
    </ThemedView>
  );
}
