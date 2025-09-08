import { FAB, Menu, Portal } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
const AlbumFAB = () => {
  const [state, setState] = useState({ open: false });
  // const [open, setOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const { open } = state;
  return (
    <Portal>
      <View className="bottom-2 right-2 absolute">
        <FAB icon="plus" onPress={() => setMenuVisible((v) => v!)} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={{ x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER }}
        >
          <Menu.Item
            onPress={() => setMenuVisible(false)}
            title="Add Image"
            leadingIcon="plus"
          />
        </Menu>
      </View>
    </Portal>
  );
};

export default AlbumFAB;
