import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from "react-native";
import RoundedButton from "../../components/RoundedButton";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";

import useViewModel from "./ViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./Styles";

interface Props extends StackScreenProps<RootStackParamList, "HomeScreen"> {}

export const HomeScreen = ({ navigation, route }: Props) => {
  const { email, password, errorMessage, user, onChange, login } =
    useViewModel();

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (user?.id !== null && user?.id !== undefined) {
      navigation.replace("ProfileInfoScreen");
    }
  }, [user]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image
            source={require("../../../../assets/chef.jpg")}
            style={styles.imageBackground}
          />
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../../assets/logo.png")}
              style={styles.logoImage}
            />
            <Text style={styles.logoTitle}>FOOD APP</Text>
          </View>
          <View style={styles.form}>
            <Text style={styles.formText}>INGRESAR</Text>
            <ScrollView>
              <CustomTextInput
                image={require("../../../../assets/email.png")}
                placeholder="Correo electronico"
                keyboardType="email-address"
                property="email"
                onChangeText={onChange}
                value={email}
              />
              <CustomTextInput
                image={require("../../../../assets/password.png")}
                placeholder="Contraseña"
                keyboardType="default"
                property="password"
                onChangeText={onChange}
                value={password}
                secureTextEntry
              />

              <View style={{ marginTop: 30 }}>
                <RoundedButton text="Entrar" onPress={() => login()} />
              </View>
              <View style={styles.formRegister}>
                <Text>No tienes cuenta?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
                  <Text style={styles.formRegisterText}>Registrate</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
