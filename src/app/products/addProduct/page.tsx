"use client";

import { Form, Input, Button } from "antd";
import React from "react";
import Product from "@/app/interface/product";
import { useState } from "react";
import axios from "axios";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const onFinish = (values: Product) => {
    values.price = Number(values.price);
    axios
      .post("https://fakestoreapi.com/products", {
        values,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавить товар</h1>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.form}
      >
        <Form.Item
          className={styles.formItem}
          name="title"
          label="Название"
          rules={[{ required: true, message: "Поле не должно быть пустым" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="description"
          label="Описание"
          rules={[{ required: true, message: "Поле не должно быть пустым" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          name="price"
          label="Цена"
          rules={[
            {
              required: true,
              message: "Поле не должно быть пустым",
            },
            {
              pattern: new RegExp(/^[0-9.]+$/),
              message: "Введите число!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name="image"
          label="Ссылка на изображение"
          rules={[
            { required: true, message: "Поле не должно быть пустым" },
            { type: "url", message: "Введите ссылку!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          name="category"
          label="Категория"
          rules={[{ required: true, message: "Поле не должно быть пустым" }]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
