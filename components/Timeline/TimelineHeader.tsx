import { View } from "react-native";
import { Divider, Surface } from "react-native-paper";
import { ThemedView } from "../ThemedView";
import { Text, Chip } from "react-native-paper";
import { Section } from "./TimelineItem";

type Props = {
  section: Section;
};
export default function TimelineHeader({ section }: Props) {
  return (
    <Surface elevation={1} style={{ padding: 12, marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant="titleMedium">{section.title}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Chip>{`${section.count}건`}</Chip>
          <Chip>{`${section.totalMl} mL`}</Chip>
        </View>
      </View>
      <Divider style={{ marginTop: 8 }} />
    </Surface>
  );
}
