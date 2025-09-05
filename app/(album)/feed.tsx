import { ThemedView } from "@/components/ThemedView";
import { AlbumTimeline } from "@/components/AlbumTimeline";

// 샘플 데이터 - 실제로는 API나 로컬 저장소에서 가져올 데이터
const sampleData = [
  {
    id: 1,
    date: "2024-01-15T10:30:00Z",
    image: "https://picsum.photos/400/300?random=1",
    caption: "첫 번째 사진"
  },
  {
    id: 2,
    date: "2024-01-15T14:20:00Z", 
    image: "https://picsum.photos/400/300?random=2",
    caption: "두 번째 사진"
  },
  {
    id: 3,
    date: "2024-01-16T09:15:00Z",
    image: "https://picsum.photos/400/300?random=3",
    caption: "다른 날의 사진"
  },
  {
    id: 4,
    date: "2024-01-16T16:45:00Z",
    image: "https://picsum.photos/400/300?random=4"
  },
  {
    id: 5,
    date: "2024-01-18T11:00:00Z",
    image: "https://picsum.photos/400/300?random=5",
    caption: "최신 사진"
  }
];

export default function FeedScreen() {

  return <ThemedView>
    <AlbumTimeline data={sampleData} />;
  </ThemedView>
}
