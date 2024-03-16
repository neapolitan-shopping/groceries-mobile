import { Modal, Pressable, StyleSheet } from "react-native";
import { TextInput as MaterialTextInput } from "react-native-paper";
import { View, Text } from "../Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createList } from "@/lib/fetch/list";

export default function AddListModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { control, getValues, handleSubmit } = useForm();

  const addListMutation = useMutation({
    mutationFn: (newList: { name: string }) => createList(newList),
    onSuccess: (data) => console.log("data :>> ", data),
  });

  const onSubmit = (data: any) => {
    const bodyData = {
      name: data.listName,
    };

    addListMutation.mutateAsync(bodyData);
  }

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
        <View style={styles.backdrop}>
          <View style={styles.modalContent}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "80%",
              }}
            >
              <View
                style={{
                  height: "70%",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16 }}>Inserisci nome lista</Text>
                <Controller
                  control={control}
                  defaultValue=""
                  name="listName"
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <MaterialTextInput
                      mode="outlined"
                      value={value}
                      placeholder="mamma mia che input bello"
                      onChangeText={(txt) => onChange(txt)}
                      style={{
                        height: 32,
                        marginTop: 12,
                      }}
                    />
                  )}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "50%",
                  marginBottom: 16,
                }}
              >
                <Pressable onPress={() => setIsModalOpen(false)}>
                  <Text style={{ color: "lightblue" }}>Cancel</Text>
                </Pressable>
                <Pressable onPress={handleSubmit(onSubmit)}>
                  <Text style={{ color: "lightblue" }}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
