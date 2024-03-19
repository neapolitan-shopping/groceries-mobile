import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Modal,
  ModalProps,
} from "react-native";
import { View } from "../Themed";
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
    <View>
      <Modal transparent visible={isModalOpen} {...modalProps}>
        <View style={styles.backdrop}>
          <View style={styles.modalContent}>{children(parentProps)}</View>
        </View>
      </Modal>
      <Pressable onPress={() => setIsModalOpen(true)}>
        {({ pressed }) => renderIcon({ pressed })}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
