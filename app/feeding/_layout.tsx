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


  return (
    <ThemedView className="h-full">
      <TimelineView events={feedingExample}/>
      <FeedingFAB/>
    </ThemedView> 
  );
}
