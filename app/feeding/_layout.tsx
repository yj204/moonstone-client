import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedView } from "@/components/ThemedView";
import {subDays, subHours, startOfDay} from 'date-fns'
import { groupBy } from 'remeda'

const feedingExample = [
  {
    id: 1,
    date: new Date().toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 2,
    date: subHours(new Date(),1).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 3,
    date: subHours(new Date(),2).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 4,
    date: subHours(new Date(),3).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 5,
    date: subHours(new Date(),4).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 6,
    date: subHours(subDays(new Date(),1),1).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 7,
    date: subHours(subDays(new Date(),1),2).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 8,
    date: subHours(subDays(new Date(),1),3).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },
  {
    id: 9,
    date: subHours(subDays(new Date(),1),4).toISOString(),
    type : 'feeding',   
    amount_ml: 120,
    duration: 15,
    note: '잘 먹었네'
  },

]

export default function TabLayout() {
  const groupByDate = groupBy(feedingExample,(value=>startOfDay(value.date).toString()))
  console.log(groupByDate)

  return (

    
    <ThemedView className="h-full">
      this is feeding view 
    </ThemedView>
    // <Tabs
    //   screenOptions={{
    //     // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //     tabBarBackground: TabBarBackground,
    //     tabBarStyle: Platform.select({
    //       ios: {
    //         // Use a transparent background on iOS to show the blur effect
    //         position: "absolute",
    //       },
    //       default: {},
    //     }),
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Home",
    //       tabBarIcon: ({ color }) => (
    //         <IconSymbol size={28} name="house.fill" color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: "Explore",
    //       tabBarIcon: ({ color }) => (
    //         <IconSymbol size={28} name="paperplane.fill" color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>
  );
}
