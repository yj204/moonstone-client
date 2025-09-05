import AlbumFAB from "@/components/AlbumFAB";
import { Timeline } from "@/components/Timeline";
import { useMaterialTheme } from '@/hooks/useMaterialColor';
import { View } from "react-native";
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
  {
    id: "8",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300",
    // caption: "한라산 정상에서",
  },
  {
    id: "9",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300",
    // caption: "한라산 정상에서",
  },
  {
    id: "10",
    date: "2025-08-03",
    image: "https://picsum.photos/200/300",
    // caption: "한라산 정상에서",
  },
];

export default function AlbumMainScreen() {
  const theme = useMaterialTheme();
  
  console.log('Album theme colors:', {
    background: theme.colors.background,
    surface: theme.colors.surface,
    onBackground: theme.colors.onBackground,
    onSurface: theme.colors.onSurface
  });

  return (
    <View className="primary">
      <ScrollView style={{ flex: 1 }}>
        <Timeline data={data} />
      </ScrollView>
      <AlbumFAB />
    </View>
  );
}
