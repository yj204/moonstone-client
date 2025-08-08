import AlbumFAB from "@/components/AlbumFAB";
import { useNavigation } from "expo-router";
import { View, Text } from "react-native";
import FeedScreen from "./feed";
import { TimelineItem } from "@/components/TimelineItem";
import { Timeline } from "@/components/Timeline";
import { ScrollView } from "react-native-gesture-handler";
const data = [
  {
    id: "1",
    date: "2025-08-01",
    image: "https://picsum.photos/200/300?random=1",
    caption: "사진1?",
  },
  {
    id: "2",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300?random=2",
    // caption: "한라산 정상에서",
  },
  {
    id: "3",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300?random=3",
    // caption: "한라산 정상에서",
  },
  {
    id: "4",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300",
    // caption: "한라산 정상에서",
  },
  {
    id: "5",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300",
    // caption: "한라산 정상에서",
  },
  {
    id: "6",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300",
    // caption: "한라산 정상에서",
  },
  {
    id: "7",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300",
    // caption: "한라산 정상에서",
  },
];
export default function AlbumMainScreen() {
  return (
    <View>
      <ScrollView>
        <Timeline data={data} />
      </ScrollView>
      <AlbumFAB />
    </View>
  );
}
