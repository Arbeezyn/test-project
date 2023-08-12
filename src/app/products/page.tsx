"use client";

import React, { useState, useEffect } from "react";
import Product from "../interface/product";
import ItemCard from "../components/ItemCard";
import styles from "./products.module.css";
import axios from "axios";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";

const Products = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Товары</h1>
      <Link href="/products/addProduct">
        <Button
          className={styles.addItem}
          type="primary"
          icon={<PlusOutlined />}
        >
          Добавить товар
        </Button>
      </Link>

      <div>
        <Row gutter={[16, 16]}>
          {data.map((item, index) => (
            <Col xs={24} sm={12} md={10} lg={8} xl={6} key={index}>
              <ItemCard
                key={index}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
                category={item.category}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Products;
