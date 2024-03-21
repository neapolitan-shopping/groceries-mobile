import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Modal,
  ModalProps,
  View as DefaultView
} from "react-native";
import { View } from "../../Themed";
import { ReactNode, useState } from "react";

interface ParentProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IconModalProps {
  children: (props: ParentProps) => ReactNode;
  renderIcon: ({ pressed }: PressableStateCallbackType) => any;
  modalProps?: ModalProps;
}

export default function IconModal({
  children,
  renderIcon,
  modalProps,
}: IconModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const parentProps = {
    isModalOpen,
    setIsModalOpen,
  };
  return (
    <DefaultView style={styles.container}>
      <Modal transparent visible={isModalOpen} {...modalProps}>
        <View style={styles.backdrop}>
          <View style={styles.modalContent}>{children(parentProps)}</View>
        </View>
      </Modal>
      <Pressable  onPress={() => setIsModalOpen(true)}>
        {({ pressed }) => renderIcon({ pressed })}
      </Pressable>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: "100%",
  },
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  modalContent: {
    minWidth: 250,
    minHeight: 200,
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
});
