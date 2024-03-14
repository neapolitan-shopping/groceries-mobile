import { Modal, Pressable, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useState } from "react";

export default function AddListModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setIsModalOpen(true)}>
        {({ pressed }) => (
          <FontAwesome5
            name="cart-arrow-down"
            size={25}
            color={Colors["light"].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
      <Modal transparent visible={isModalOpen}>
        <View style={styles.container}>
          <View style={styles.modalContent}>
            <Text>Ciao sono una modal</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "none",
  },
  modalContent: {
    width: 200,
    height: 250,
    backgroundColor: "#f1f1f1f1",
  },
});
