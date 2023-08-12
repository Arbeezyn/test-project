"use client";

import { Form, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import Product from "@/app/interface/product";
import axios from "axios";
import styles from "./Update.module.css";

type Props = {
  params: {
    id: number;
  };
};
const UpdateProduct = ({ params: { id } }: Props) => {
  const onFinish = (values: Product) => {
    values.price = Number(values.price);
    axios
      .put(`https://fakestoreapi.com/products/${id}`, {
        title: values.title,
        price: values.price,
        description: values.description,
        image: values.image,
        category: values.category,
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

  const [productData, setProductData] = useState<Product>();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  const [form] = Form.useForm();

  useEffect(() => {
    if (productData) {
      console.log(productData);
      form.setFieldsValue({
        title: productData.title,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        category: productData.category,
      });
    }
  }, [productData, form]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Обновить</h1>
      <h2 className={styles.title}>{productData?.title}</h2>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
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
              message: "Введите цену",
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
          Обновить
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
