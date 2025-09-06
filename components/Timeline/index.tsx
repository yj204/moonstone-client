import React, { useMemo, useCallback } from "react";
import { View, SectionList } from "react-native";
import {
  Card,
  Text,
  Divider,
  Chip,
  useTheme,
  Surface,
} from "react-native-paper";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { ThemedView } from "../ThemedView";
import { usePaperTheme } from "@/theme/paperTheme";
import TimelineItem, { FeedEvent, Section, SectionItem } from "./TimelineItem";
import TimelineHeader from "./TimelineHeader";

type Props = {
  events: any[]; // FeedEvent | DiaperEvent
};

function buildSections(raw: FeedEvent[]): Section[] {
  const byDay: Record<string, FeedEvent[]> = {};
  for (const ev of raw) {
    const d = parseISO(ev.date);
    const dayKey = format(d, "yyyy-MM-dd");
    (byDay[dayKey] ||= []).push(ev);
  }

  const sections: Section[] = Object.entries(byDay).map(([dayKey, arr]) => {
    const sorted = arr
      .slice()
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));

    const data: SectionItem[] = sorted.map((e) => ({
      ...e,
      timeLabel: format(parseISO(e.date), "HH:mm"),
    }));

    const totalMl = sorted.reduce((sum, e) => sum + (e.amount_ml || 0), 0);
    const first = parseISO(sorted[0].date);
    const title = format(first, "yyyy-MM-dd (EEE)", { locale: ko });

    return {
      title,
      dayKey,
      totalMl,
      count: sorted.length,
      data,
    };
  });

  sections.sort((a, b) => (a.dayKey < b.dayKey ? 1 : -1));
  return sections;
}

export default function TimelineView({ events }: Props) {
  const theme = usePaperTheme();
  const sections = useMemo<Section[]>(() => buildSections(events), [events]);


  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => String(item.id)}
      renderSectionHeader={TimelineHeader}
      renderItem={TimelineItem}
      
      contentContainerStyle={{ paddingBottom: 24 }}
      ListEmptyComponent={
        <ThemedView style={{ alignItems: "center", padding: 32 }}>
          <Text>기록이 없습니다.</Text>
        </ThemedView>
      }
    />
  );
}
