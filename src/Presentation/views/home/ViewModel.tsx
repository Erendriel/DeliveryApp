import React, { useState } from "react";
import { LoginAuthUseCase } from "../../../Domain/useCases/auth/LoginAuth";

const HomeViewModel = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
    setErrorMessage("");
  };

  const login = async () => {
    if (isValidForm()) {
      const response = await LoginAuthUseCase(values.email, values.password);
      console.log("RESPONSE: ", JSON.stringify(response));
      if (!response.success) {
        setErrorMessage("Correo o contraseña incorrectos");
      }
    }
  };

  const isValidForm = (): boolean => {
    if (values.email === "") {
      setErrorMessage("Ingresa un correo electronico");
      return false;
    }
    if (!isValidEmail(values.email)) {
      setErrorMessage("Ingresa un correo electronico valido");
      return false;
    }
    if (values.password === "") {
      setErrorMessage("Ingresa la contraseña");
      return false;
    }
    return true;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return {
    ...values,
    errorMessage,
    login,
    onChange,
  };
};

export default HomeViewModel;
