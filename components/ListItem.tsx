import { useState } from "react";
import { TextInput as MaterialTextInput } from "react-native-paper";
import { View as DefaultView } from "react-native";
import BouncyCheckbox from "./BouncyCheckbox";
import { Controller, useForm } from "react-hook-form";
import { Item, ItemUpdateBody, UpdateItemAction } from "@/lib/types/Item";
import { UseMutationResult } from "@tanstack/react-query";

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
                    setIsEdit(false);
                    itemMutation.mutateAsync({
                      id: listId,
                      body: {
                        updateAction: UpdateItemAction.edit,
                        payload: {
                          itemName: value,
                        },
                        itemId: item._id,
                      },
                    });
                  }}
                />
              }
            />
          )}
        />
      ) : (
        <BouncyCheckbox
          onPress={(isChecked) => console.log("isChecked :>> ", isChecked)}
          text={item.itemName}
          textContainerStyle={{
            marginLeft: 8,
          }}
          onLongPress={() => setIsEdit(true)}
        />
      )}
    </DefaultView>
  );
}
