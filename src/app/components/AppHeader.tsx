import { Button, Menu, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styles from "./styles/AppHeader.module.css";
import { setSignOut } from "../redux/userSlice";

const AppHeader = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(setSignOut());
  };

  const userInfo = useSelector((state: RootState) => state.user);

  return (
    <Header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Menu
        style={{ width: "100%", background: "#001529" }}
        mode="horizontal"
        theme="dark"
        items={[
          { key: "1", label: <Link href="/">Главная</Link> },
          { key: "2", label: <Link href="/products">Товары</Link> },
        ]}
      />

      {userInfo.isAuth ? (
        <div className={styles.userBlock}>
          <Space size="large">
            <p className={styles.userInfo}>{userInfo.username}</p>
            <Button type="primary" onClick={signOut}>
              Выйти
            </Button>
          </Space>
        </div>
      ) : (
        <Link href="/auth">
          <Button type="primary" onClick={signOut}>
            Войти
          </Button>
        </Link>
      )}
    </Header>
  );
};

export default AppHeader;
