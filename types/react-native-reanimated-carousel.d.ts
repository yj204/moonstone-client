declare module "react-native-reanimated-carousel" {
  import type { ReactElement, ReactNode, Ref } from "react";
  import type { StyleProp, ViewStyle } from "react-native";

  export interface ICarouselInstance {
    scrollTo: (params: { index: number; animated?: boolean }) => void;
    getCurrentIndex: () => number;
    prev: () => void;
    next: () => void;
  }

  export interface CarouselProps<T = any> {
    data: T[];
    width: number;
    height: number;
    renderItem: CarouselRenderItem<T>;
    defaultIndex?: number;
    loop?: boolean;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    onSnapToItem?: (index: number) => void;
    onProgressChange?: (offsetProgress: number, absoluteProgress: number) => void;
    style?: StyleProp<ViewStyle>;
    panGestureHandlerProps?: any;
    enabled?: boolean;
    ref?: Ref<ICarouselInstance>;
  }

  export type CarouselRenderItem<T> = (info: {
    item: T;
    index: number;
    animationValue: any;
  }) => ReactElement;

  const Carousel: <T = any>(
    props: CarouselProps<T> & { ref?: Ref<ICarouselInstance> }
  ) => ReactElement;

  export default Carousel;
}

