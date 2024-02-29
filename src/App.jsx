import "./App.css";
import React from "react";
import { Layout, Flex } from "antd";
import ProductList from "./components/ProductList/product-list";
import ShoppingCart from "./components/ShoppingCart/shopping-cart";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={{height: "100vh"}}>
        <Sider style={{backgroundColor:"antiquewhite"}} width={"200px"}>
          <ShoppingCart></ShoppingCart>
        </Sider>
        <Layout>
          <Header style={{backgroundColor:"white", height:"100px"}}>
            <h1>
              Shopping Cart Demo
            </h1>
          </Header>
          <Content style={{backgroundColor:"white", overflow:"hidden"}}>
            <ProductList></ProductList>
          </Content>
          <Footer style={{backgroundColor:"white"}}>Created by Siyuan Liu, Github@Cathenax</Footer>
        </Layout>
      </Layout>
    </Flex>
  );
}

export default App;
