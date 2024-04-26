import { StyleSheet } from "react-native";
import {
  HelperText,
  TextInput as MaterialTextInput,
  TouchableRipple,
} from "react-native-paper";
import { View, Text } from "./Themed";
import { useForm, Controller } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import FABModal from "./common/Modals/FABModal";
import { ItemUpdateBody, UpdateItemAction } from "@/lib/types/Item";
import ObjectID from "bson-objectid";
const listModalBorderRadius: number = 16;

interface AddItemFABModalProps {
  listId: string;
  itemMutation: UseMutationResult<
    any,
    Error,
    {
      id: string;
      body: ItemUpdateBody;
    },
    void
  >;
}

export default function AddItemFABModal({
  listId,
  itemMutation,
}: AddItemFABModalProps) {
  const { control, handleSubmit } = useForm<{ itemName: string }>();

  const onSubmit = ({ itemName }: { itemName: string }) => {
    const body: ItemUpdateBody = {
      updateAction: UpdateItemAction.add,
      payload: {
        _id: ObjectID().toHexString(),
        itemName,
      },
    };
    itemMutation.mutate({ id: listId, body });
  };

  return (
    <FABModal
      FABIconName="plus"
      FABProps={{
        size: "medium",
        style: styles.FAB,
      }}
      positionStyle={styles.containerPosition}
    >
      {({ setIsModalOpen }) => (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titleText}>Inserisci Nome</Text>
            <Controller
              control={control}
              defaultValue=""
              name="itemName"
              rules={{
                required: { value: true, message: "Item name is required" },
                maxLength: { value: 25, message: "Name is too long." },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View style={styles.controllerItemContainer}>
                  <MaterialTextInput
                    mode="flat"
                    value={value}
                    placeholder="...."
                    placeholderTextColor="#d8d8d8"
                    onChangeText={(txt) => onChange(txt)}
                    style={styles.textInput}
                  />
                  {error && (
                    <HelperText type="error">{error.message}</HelperText>
                  )}
                </View>
              )}
            />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableRipple
              style={styles.cancelPressable}
              onPress={() => setIsModalOpen(false)}
            >
              <MaterialCommunityIcons name="close-circle-outline" size={28} />
            </TouchableRipple>
            <TouchableRipple
              style={styles.confirmPressable}
              onPress={handleSubmit(onSubmit)}
            >
              <MaterialIcons name="shopping-cart-checkout" size={28} />
            </TouchableRipple>
          </View>
        </View>
      )}
    </FABModal>
  );
}

const styles = StyleSheet.create({
  containerPosition: {
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0,
  },
  FAB: {
    backgroundColor: "lightblue",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
    borderRadius: listModalBorderRadius,
  },
  modalContent: {
    height: "70%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: listModalBorderRadius,
  },
  titleText: {
    fontSize: 16,
  },
  controllerItemContainer: {
    width: "80%",
  },
  textInput: {
    height: 32,
    marginTop: 12,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 44,
    borderRadius: listModalBorderRadius,
  },
  cancelPressable: {
    flex: 1,
    backgroundColor: "pink",
    borderBottomLeftRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmPressable: {
    flex: 1,
    backgroundColor: "lightgreen",
    borderBottomRightRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
