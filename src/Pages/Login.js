import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => console.log(data);

  return null;
};
