import { useEffect, useState } from "react";
// import { useColorScheme as useRNColorScheme } from 'react-native';
import { useColorScheme as useRNColorScheme } from "nativewind";



// 전역 테마 상태 관리
let globalThemeMode: ThemeMode = "system";
let globalThemeModeListeners: Array<() => void> = [];

export const setGlobalThemeMode = (mode: ThemeMode) => {
  globalThemeMode = mode;
  // 로컬 스토리지에 즉시 저장
  if (typeof window !== "undefined") {
    localStorage.setItem("themeMode", mode);
    // console.log("Saved theme mode to localStorage:", mode);
  }
  globalThemeModeListeners.forEach((listener) => listener());
};

export const getGlobalThemeMode = () => globalThemeMode;

export const addThemeModeListener = (listener: () => void) => {
  globalThemeModeListeners.push(listener);
  return () => {
    globalThemeModeListeners = globalThemeModeListeners.filter(
      (l) => l !== listener
    );
  };
};

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */


export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isClientReady, setIsClientReady] = useState(false);
  const [, forceUpdate] = useState({});

  const { colorScheme: RNColorScheme } = useRNColorScheme();
  const [colorScheme, setColorScheme] = useState(RNColorScheme);

  // 서버사이드 렌더링 시에도 시스템 테마를 감지
  // const getInitialTheme = (): "light" | "dark" => {
  //   if (typeof window !== "undefined") {
  //     // 로컬 스토리지에서 저장된 테마 모드 먼저 확인
  //     const savedThemeMode = localStorage.getItem("themeMode") as ThemeMode;
  //     if (savedThemeMode && savedThemeMode !== "system") {
  //       globalThemeMode = savedThemeMode;
  //       // console.log("Initial load - using saved theme mode:", savedThemeMode);
  //       return savedThemeMode;
  //     }

  //     // 시스템 테마 감지
  //     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  //       .matches
  //       ? "dark"
  //       : "light";
  //     // console.log("Initial load - using system theme:", systemTheme);      return systemTheme;
  //   }
  //   return "light"; // 서버에서는 기본값
  // };

  // const [systemTheme, setSystemTheme] = useState<"light" | "dark">(
  //   getInitialTheme()
  // );

  // // 초기 로드 시 즉시 로컬 스토리지 확인
  // // useEffect(() => {
  // //   if (typeof window !== "undefined") {
  // //     const savedThemeMode = localStorage.getItem("themeMode") as ThemeMode;
  // //     if (savedThemeMode && savedThemeMode !== "system") {
  // //       globalThemeMode = savedThemeMode;
  // //       // HTML 요소에 즉시 테마 적용
  // //       document.documentElement.setAttribute("data-theme", savedThemeMode);
  // //       // console.log("Immediate theme application:", savedThemeMode);
  // //     }
  // //   }
  // // }, []);

  useEffect(() => {
    setHasHydrated(true);

    // 클라이언트 준비 상태 설정
    setIsClientReady(true);

    // 로컬 스토리지에서 테마 모드 불러오기 (이미 getInitialTheme에서 처리됨)
    if (typeof window !== "undefined") {
      const savedThemeMode = localStorage.getItem("themeMode") as ThemeMode;
      if (savedThemeMode) {
        globalThemeMode = savedThemeMode;
      }
    }

    // 시스템 테마 감지
    // const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // const updateTheme = () => {
    //   const newTheme = mediaQuery.matches ? "dark" : "light";
    //   // console.log("System theme changed to:", newTheme);
    //   setSystemTheme(newTheme);
    // };

    // updateTheme(); // 초기 설정
    // mediaQuery.addEventListener("change", updateTheme);

    // 전역 테마 모드 변경 리스너
    // const removeListener = addThemeModeListener(() => {
    //   forceUpdate({});
    // });

    return () => {
      // mediaQuery.removeEventListener("change", updateTheme);
      // removeListener();
    };
  }, [globalThemeMode]);

  // 현재 테마 결정
  // const getCurrentColorScheme = (): "light" | "dark" => {
  //   if (globalThemeMode === "system") {
  //     return systemTheme;
  //   }
  //   return globalThemeMode;
  // };

  const currentColorScheme = colorScheme ?? "system";

  // HTML 요소에 테마 속성 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentColorScheme);
    }
  }, [currentColorScheme, colorScheme]);

  console.log("color scheme changed", colorScheme);
  return {
    colorScheme: globalThemeMode,
    setColorScheme: (newMode: ThemeMode) => {
      globalThemeMode = newMode;
    },
  };
}
