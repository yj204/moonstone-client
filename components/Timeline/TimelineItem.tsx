import { usePaperTheme } from "@/theme/paperTheme";
import { ThemedView } from "../ThemedView";
import { Card, Chip, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

import { ThemedText } from "../ThemedText";

type EventType = "feeding" | "diaper";

export type FeedEvent = {
  id: number | string;
  date: string; // ISO string
  type: EventType; // "feeding" | "diaper" (확장 대비)
  amount_ml?: number;
  duration?: number; // minutes
  note?: string;
};

export type SectionItem = FeedEvent & {
  timeLabel: string; // "14:30"
};

export type Section = {
  title: string; // "2025-09-05 (금)"
  dayKey: string; // "2025-09-05"
  totalMl: number; // 일일 총 섭취량
  count: number; // 일일 기록 수
  data: SectionItem[];
};

type Props = {
  item: SectionItem;
  index: number;
  section: Section;
};

export default function TimelineItem({ index, section, item }: Props) {
  const isLast = index === section.data.length - 1;
  const isFirst = index === 0;
  const isFeeding = item.type === "feeding";
  const theme = usePaperTheme();

  return (
    <ThemedView style={{ flexDirection: "row", paddingHorizontal: 16 }}>
      {/* 타임라인 레일 */}
      <ThemedView className="flex-row">
        <View className="flex w-[80] justify-center items-center">
          <Chip>{item.timeLabel}</Chip>
        </View>
        <ThemedView
          style={{
            width: 14, // 고정
            alignItems: "center", // 가로 중앙
            marginHorizontal: 12,
            justifyContent: "center",
          }}
        >
          {/* 위쪽 라인 (첫 요소면 렌더 X) */}

          <ThemedView
            style={{
              width: isFirst ? 0 : 2,
              flex: 1,
              backgroundColor: theme.colors.outline,
            }}
          />

          {/* 노드(짝수 크기 권장: 12) */}
          <ThemedView
            style={{
              position: "absolute",
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: theme.colors.primary,
              borderWidth: 2,
              borderColor: theme.colors.surface,
              shadowColor: theme.colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 3,
            }}
          />

          <ThemedView
            style={{
              width: isLast ? 0 : 2,
              flex: 1,
              backgroundColor: theme.colors.outline,
            }}
          />
        </ThemedView>
      </ThemedView>
      {/* 카드 */}
      <Card
        className="mb-2"
        style={{ flex: 1, marginBottom: 10, marginTop: 10 }}
      >
        <Card.Content style={{ paddingVertical: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text variant="titleMedium">
              {isFeeding ? `${item.amount_ml ?? 0} mL` : "배변"}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 4 }}
          >
            <Chip
              compact
              style={{ marginRight: 4 }}
              icon={isFeeding ? "cup" : "emoticon-poop"}
            >
              {isFeeding ? "수유" : "배변"}
            </Chip>
            {isFeeding && item.duration != null && (
              <Chip compact>{`${item.duration}분`}</Chip>
            )}
          </View>

          {item.note ? (
            <Text variant="bodyMedium" style={{ marginTop: 8 }}>
              {item.note}
            </Text>
          ) : null}
        </Card.Content>
      </Card>
    </ThemedView>
  );
}
