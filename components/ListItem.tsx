import { useState } from "react";
import { TextInput as MaterialTextInput } from "react-native-paper";
import { View as DefaultView } from "react-native";
import BouncyCheckbox from "./BouncyCheckbox";
import { Controller, useForm } from "react-hook-form";

export default function ListItem({ item }: any) {
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
                  onPress={() => setIsEdit(false)}
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
