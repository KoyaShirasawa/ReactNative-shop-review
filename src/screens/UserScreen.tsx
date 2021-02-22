import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { updateUser } from "../lib/firebase";
import firebase from "firebase";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
// component
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";

//context
import { UserContext } from "../contexts/userContext";


type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const {user, setUser} = useContext(UserContext);
  const [name, setName] = useState<string>(user.name);
  const [loading, setLoading] = useState<boolean>(false);

  const updatedAt = firebase.firestore.Timestamp.now();
  const onSubmit = async () => {
    setLoading(true);
    await updateUser(user.id, {name: name, updatedAt: updatedAt});
    setUser({...user, name, updatedAt});
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0E4",
    // justifyContent: "center",
  },
});
