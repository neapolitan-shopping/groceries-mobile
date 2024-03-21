import {
  StyleSheet,
  Modal,
  ModalProps,
  View as DefaultView,
  ViewStyle,
} from "react-native";
import { View } from "../../Themed";
import { ReactNode, useState } from "react";
import { FAB, FABProps } from "react-native-paper";

interface ParentProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IconModalProps {
  children: (props: ParentProps) => ReactNode;
  FABIconName: string;
  modalProps?: ModalProps;
  FABProps?: Partial<FABProps>;
  positionStyle?: ViewStyle;
}

export default function FABModal({
  children,
  modalProps,
  FABIconName = "plus",
  FABProps,
  positionStyle,
}: IconModalProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const parentProps = {
    isModalOpen,
    setIsModalOpen,
  };
  return (
    <DefaultView style={[styles.container, positionStyle]}>
      <Modal transparent visible={isModalOpen} {...modalProps}>
        <View style={styles.backdrop}>
          <View style={styles.modalContent}>{children(parentProps)}</View>
        </View>
      </Modal>
      <FAB
        icon={FABIconName}
        {...FABProps}
        onPress={(e) => {
          setIsModalOpen(true);
          FABProps?.onPress && FABProps.onPress(e);
        }}
      />
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
