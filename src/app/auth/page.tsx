"use client";

import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import User from "../interface/user";
import styles from "./Auth.module.css";

const Auth = () => {
  const [loginError, setLoginError] = useState(false);
  const dispatch = useDispatch();

  const onFinish = (userData: User) => {
    axios
      .post("https://fakestoreapi.com/auth/login", {
        username: userData.username,
        password: userData.password,
      })
      .then((response) => {
        setLoginError(false);
        dispatch(
          setUserData({
            username: userData.username,
            isAuth: true,
            token: response.data.token,
          })
        );
      })
      .catch((error) => {
        setLoginError(true);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    setLoginError(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Авторизация</h1>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.form}
      >
        <Form.Item
          className={styles.formItem}
          name="username"
          label="Логин"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="password"
          label="Пароль"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>
        {loginError && (
          <p style={{ color: "red", fontSize: "14px" }}>
            Неверный логин или пароль
          </p>
        )}

        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default Auth;
