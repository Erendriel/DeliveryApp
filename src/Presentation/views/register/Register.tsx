import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { RoundedButton } from "../../components/RoundedButton";
import useViewModel from "./ViewModel";
import CustomTextInput from "../../components/CustomTextInput";
import styles from "./Styles";

const RegisterScreen = () => {
  const {
    name,
    lastName,
    email,
    phone,
    confirmPassword,
    password,
    errorMessage,
    onChange,
    register,
  } = useViewModel();

  useEffect(() => {
    if (errorMessage !== "") ToastAndroid.show(errorMessage, ToastAndroid.LONG);
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
              source={require("../../../../assets/user_image.png")}
              style={styles.logoImage}
            />
            <Text style={styles.logoTitle}>SELECCIONA UNA IMAGEN</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formText}>REGISTRARSE</Text>
            <ScrollView>
              <CustomTextInput
                placeholder="Nombres"
                image={require("../../../../assets/user.png")}
                keyboardType="default"
                onChangeText={onChange}
                property="name"
                value={name}
              />
              <CustomTextInput
                placeholder="Apellidos"
                image={require("../../../../assets/my_user.png")}
                keyboardType="default"
                onChangeText={onChange}
                property="lastName"
                value={lastName}
              />
              <CustomTextInput
                placeholder="Correo Electronico"
                image={require("../../../../assets/email.png")}
                keyboardType="email-address"
                onChangeText={onChange}
                property="email"
                value={email}
              />
              <CustomTextInput
                placeholder="Telefono"
                image={require("../../../../assets/phone.png")}
                keyboardType="numeric"
                onChangeText={onChange}
                property="phone"
                value={phone}
              />
              <CustomTextInput
                placeholder="Contraseña"
                image={require("../../../../assets/password.png")}
                keyboardType="default"
                secureTextEntry
                onChangeText={onChange}
                property="password"
                value={password}
              />
              <CustomTextInput
                placeholder="Confirmar Contraseña"
                image={require("../../../../assets/confirm_password.png")}
                keyboardType="default"
                secureTextEntry
                onChangeText={onChange}
                property="confirmPassword"
                value={confirmPassword}
              />

              <View style={{ marginTop: 30, marginBottom: 70 }}>
                <RoundedButton text="CONFIRMAR" onPress={() => register()} />
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
