import { Pressable } from "react-native";
import { HelperText, TextInput as MaterialTextInput } from "react-native-paper";
import { View, Text } from "../Themed";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createList } from "@/lib/fetch/list";
import IconModal from "../common/IconModal";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function AddListModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    listName: string;
  }>();
  const addListMutation = useMutation({
    mutationFn: (newList: { name: string }) => createList(newList),
    onSuccess: (data) => console.log("data :>> ", data),
  });

  const onSubmit = (data: any) => {
    const bodyData = {
      name: data.listName,
    };
    addListMutation.mutate(bodyData);
  };

  return (
    <IconModal
      modalProps={{
        animationType: "fade",
      }}
      renderIcon={({ pressed }) => (
        <FontAwesome5
          name="cart-arrow-down"
          size={25}
          color={Colors["light"].text}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    >
      {({ setIsModalOpen }) => (
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
                required: { value: true, message: "List name is required" },
              }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <MaterialTextInput
                    mode="flat"
                    value={value}
                    placeholder="...."
                    placeholderTextColor="#d8d8d8"
                    onChangeText={(txt) => onChange(txt)}
                    style={{
                      height: 32,
                      marginTop: 12,
                    }}
                  />
                  {errors.listName && (
                    <HelperText type="error">
                      {errors.listName.message}
                    </HelperText>
                  )}
                </View>
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
              <MaterialCommunityIcons name="close-circle-outline" size={24} />
            </Pressable>
            <Pressable onPress={handleSubmit(onSubmit)}>
              <MaterialIcons name="shopping-cart-checkout" size={24} />
            </Pressable>
          </View>
        </View>
      )}
    </IconModal>
  );
}
