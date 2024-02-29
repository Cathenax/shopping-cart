import "./App.css";
import React from "react";
import { Layout } from "antd";
import ProductList from "./components/ProductList/product-list";
import ShoppingCart from "./components/ShoppingCart/shopping-cart";

const { Header, Footer, Sider, Content } = Layout;
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  maxHeight: "100vh",
};

function App() {
  return (
    <Layout style={layoutStyle} hasSider>
      <Sider style={{backgroundColor:"antiquewhite"}} width={"200px"}>
        <ShoppingCart></ShoppingCart>
      </Sider>
      <Layout>
        <Header style={{backgroundColor:"white", height:"100px"}}>
          <h1>
            Shopping Cart Demo
          </h1>
        </Header>
        <Content style={{backgroundColor:"white"}}>
          <ProductList></ProductList>
        </Content>
        <Footer style={{backgroundColor:"white"}}>Created by Siyuan Liu, Github@Cathenax</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
