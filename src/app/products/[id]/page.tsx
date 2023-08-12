"use client";

import React from "react";
import styles from "./ItemPage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Product from "@/app/interface/product";
import { Button } from "antd";
import Link from "next/link";
import { StarOutlined } from "@ant-design/icons";

type Props = {
  params: {
    id: number;
  };
};

const ItemPage = ({ params: { id } }: Props) => {
  const [data, setData] = useState<Product>();

  const deleteItem = () => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Ошибка при удалении:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data?.title}</h1>
      <div className={styles.content}>
        <img className={styles.img} src={data?.image} alt="" />
        <div className={styles.description}>
          <p>Описание: {data?.description}</p>
          <p>Цена: {data?.price}</p>
          <p>Категория: {data?.category}</p>
          Рейтинг: <StarOutlined /> {data?.rating.rate} / {data?.rating.count}
          <div className={styles.buttons}>
            <Link href={`/products/${id}/update`}>
              <Button type="primary">Обновить</Button>
            </Link>
            <Button
              type="primary"
              danger
              onClick={deleteItem}
              className={styles.deleteBtn}
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
