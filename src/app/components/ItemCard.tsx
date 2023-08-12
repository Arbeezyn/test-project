import React from "react";
import { Card } from "antd";
import styles from "./styles/ItemCard.module.css";
import Product from "../interface/product";
import Link from "next/link";
import { StarOutlined } from "@ant-design/icons";

const ItemCard = (props: Product) => {
  return (
    <Card
      title={<Link href={`/products/${props.id}`}>{props.title}</Link>}
      bordered
      className={styles.card}
    >
      <div className={styles.content}>
        <img className={styles.img} src={props.image} alt="" />
        <div className={styles.info}>
          <p>Цена: {props.price}</p>
          <p>Категории: {props.category}</p>
          <p>
            Рейтинг: <StarOutlined /> {props.rating.rate} / {props.rating.count}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
