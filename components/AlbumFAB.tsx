import { FAB, Portal } from "react-native-paper";
import { useState } from "react";
const AlbumFAB = () => {
  const [state, setState] = useState({ open: false });
  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? "calendar-today" : "plus"}
        actions={[
          { icon: "plus", onPress: () => console.log("on click add image ") },
        ]}
        onStateChange={({ open }) => setState({ open })}
      />
    </Portal>
  );
};

export default AlbumFAB;
