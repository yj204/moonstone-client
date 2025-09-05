import { usePaperTheme } from "@/theme/paperTheme";
import { ThemedView } from "../ThemedView";
import { Card, Chip, Text } from "react-native-paper";
import { View } from "react-native";

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
  const isFeeding = item.type === "feeding";
  const theme = usePaperTheme();

  return (
    <ThemedView style={{ flexDirection: "row", paddingHorizontal: 16 ,marginBottom:10 }}>
      {/* 타임라인 레일 */}
      <ThemedView style={{ alignItems: "center", marginRight: 12 }}>
        {/* 위쪽 라인 */}
        {index !== 0 && (
          <ThemedView
            style={{
              width: 2,
              height: 12,
              backgroundColor: theme.colors.outline,
            }}
          />
        )}
        {/* 노드 */}
        <ThemedView
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.colors.primary,
          }}
        />
        {/* 아래쪽 라인 */}
        {!isLast && (
          <ThemedView
            style={{ width: 2, flex: 1, backgroundColor: theme.colors.outline }}
          />
        )}
      </ThemedView>

      {/* 카드 */}
      <Card className="mb-2" style={{ flex: 1  }}>
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
            <Text variant="labelMedium" style={{ opacity: 0.7 }}>
              {item.timeLabel}
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
