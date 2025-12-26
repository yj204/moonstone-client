import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";
import { subDays, subHours, startOfDay } from "date-fns";
import { groupBy, pipe, sortBy } from "remeda";
import  TimelineView  from "@/components/Timeline";
import FeedingFAB from "@/components/Button/FeedingFAB";
import FeedingFormDialog from "@/components/FeedingFormDialog";
import DiaperFormDialog from "@/components/DiaperFormDialog";

export type FeedEvent = {
  id: number;
  date: Date | string;
  type?: string;
  amount_ml?: number;
  duration?: number;
  note?: string;
};
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

export default function TabLayout() {
  const [events, setEvents] = React.useState<FeedEvent[]>(feedingExample);
  const [formVisible, setFormVisible] = React.useState(false);
  const [diaperFormVisible, setDiaperFormVisible] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<FeedEvent | null>(null);
  const [formMode, setFormMode] = React.useState<"add" | "edit">("add");

  // 최근 수유 데이터에서 기본값 가져오기 (events는 최신 항목이 앞에 있음)
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
          event.id === editingItem.id
            ? { ...event, ...data }
            : event
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

  const handleAddDiaper = (data: Omit<FeedEvent, "id" | "type"> & { diaperType?: string }) => {
    const newEvent: FeedEvent = {
      id: Date.now(),
      type: "diaper",
      ...data,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleEditDiaper = (data: Omit<FeedEvent, "id" | "type"> & { diaperType?: string }) => {
    if (editingItem) {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingItem.id
            ? { ...event, ...data }
            : event
        )
      );
    }
  };

  const handleDiaperFormDismiss = () => {
    setDiaperFormVisible(false);
    setEditingItem(null);
    setFormMode("add");
  };

  const handleDiaperFormConfirm = (data: Omit<FeedEvent, "id" | "type"> & { diaperType?: string }) => {
    if (formMode === "edit") {
      handleEditDiaper(data);
    } else {
      handleAddDiaper(data);
    }
    handleDiaperFormDismiss();
  };

  return (
    <ThemedView className="flex-1">
      <TimelineView events={events} onItemPress={handleItemPress} />
      <FeedingFAB 
        onOpenForm={() => {
          setFormMode("add");
          setEditingItem(null);
          setFormVisible(true);
        }}
        onOpenDiaperForm={() => {
          setFormMode("add");
          setEditingItem(null);
          setDiaperFormVisible(true);
        }}
      />
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
