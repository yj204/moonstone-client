import {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from "react";

type DrawerContextType = {
  activeItem: string;
  setActiveItem: (value: string) => void;
};
const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }

  return {
    ...context,
  };
};

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [activeItem, setActiveItem] = useState("album");
  return (
    <DrawerContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </DrawerContext.Provider>
  );
};
