import { useState } from "react";
import { TextInput as MaterialTextInput } from "react-native-paper";
import { View as DefaultView, Pressable, StyleSheet } from "react-native";
import BouncyCheckbox from "./BouncyCheckbox";
import { Controller, useForm } from "react-hook-form";
import { Item, ItemUpdateBody, UpdateItemAction } from "@/lib/types/Item";
import { UseMutationResult } from "@tanstack/react-query";
import { MaterialIcons } from "@expo/vector-icons";

interface ListItemProps {
  item: Item;
  itemMutation: UseMutationResult<
    any,
    Error,
    {
      id: string;
      body: ItemUpdateBody;
    },
    void
  >;
  listId: string;
}

export default function ListItem({
  item,
  itemMutation,
  listId,
}: ListItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const {
    control,
    //  handleSubmit,
    //   formState: { errors },
  } = useForm<{
    itemName: string;
  }>();

  return (
    <DefaultView>
      {isEdit ? (
        <Controller
          control={control}
          defaultValue={item.itemName}
          name="itemName"
          rules={{
            required: { value: true, message: "Item name is required" },
            maxLength: { value: 25, message: "Item name is too long." },
          }}
          render={({ field: { onChange, value } }) => (
            <MaterialTextInput
              mode="outlined"
              style={{
                height: 38,
              }}
              value={value}
              onChangeText={(txt) => onChange(txt)}
              right={
                <MaterialTextInput.Icon
                  icon="check"
                  onPress={async () => {
                    await itemMutation.mutateAsync({
                      id: listId,
                      body: {
                        updateAction: UpdateItemAction.edit,
                        payload: {
                          itemName: value,
                        },
                        itemId: item._id,
                      },
                    });
                    setIsEdit(false);
                  }}
                />
              }
            />
          )}
        />
      ) : (
        <DefaultView style={styles.checkbox_container}>
          <BouncyCheckbox
            style={styles.chekcbox_content}
            isChecked={item.checked}
            onPress={(isChecked) => {
              itemMutation.mutate({
                id: listId,
                body: {
                  updateAction: UpdateItemAction.edit,
                  payload: {
                    checked: isChecked,
                  },
                  itemId: item._id,
                },
              });
            }}
            text={item.itemName}
            textContainerStyle={{
              marginLeft: 8,
            }}
            onLongPress={() => setIsEdit(true)}
          />
          <Pressable
            style={styles.delete_icon}
            onPress={() => {
              itemMutation.mutate({
                id: listId,
                body: {
                  updateAction: UpdateItemAction.delete,
                  itemId: item._id,
                },
              });
            }}
          >
            <MaterialIcons name="delete-forever" size={32} />
          </Pressable>
        </DefaultView>
      )}
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  checkbox_container: {
    flex: 1,
    flexDirection: "row",
  },
  chekcbox_content: {
    flex: 9,
  },
  delete_icon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
