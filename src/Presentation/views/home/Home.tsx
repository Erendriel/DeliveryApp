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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";

import useViewModel from "./ViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./Styles";

export const HomeScreen = () => {
  const { email, password, errorMessage, onChange, login } = useViewModel();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (errorMessage !== "") {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage]);

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
            <ScrollView>
              <Text style={styles.formText}>INGRESAR</Text>

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
