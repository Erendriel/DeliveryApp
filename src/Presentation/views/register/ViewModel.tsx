import { useState } from "react";
import { RegisterAuthUseCase } from "../../../Domain/useCases/auth/RegisterAuth";

const RegisterViewModel = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [values, setValues] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validationRules: { [key: string]: () => string } = {
    name: () => (values.name.trim() === "" ? "Ingresa tu nombre" : ""),
    lastName: () =>
      values.lastName.trim() === "" ? "Ingresa tu apellido" : "",
    email: () =>
      !/^\S+@\S+\.\S+$/.test(values.email)
        ? "Ingresa un correo electrónico válido"
        : "",
    phone: () =>
      values.phone.trim() === "" ? "Ingresa tu número de teléfono" : "",
    password: () =>
      values.password.length < 8
        ? "La contraseña debe tener al menos 8 caracteres"
        : "",
    confirmPassword: () =>
      values.password !== values.confirmPassword
        ? "Las contraseñas no coinciden"
        : "",
  };

  const isValidForm = (): boolean => {
    for (const key in validationRules) {
      const error = validationRules[key]();
      if (error) {
        setErrorMessage(error);
        return false;
      }
    }
    return true;
  };
  const onChange = (property: string, value: any) => {
    setValues({ ...values, [property]: value });
  };

  const register = async () => {
    if (isValidForm()) {
      const response = await RegisterAuthUseCase(values);
      console.log("RESULT: ", JSON.stringify(response));
    }
  };

  return {
    ...values,
    errorMessage,
    onChange,
    register,
  };
};

export default RegisterViewModel;
