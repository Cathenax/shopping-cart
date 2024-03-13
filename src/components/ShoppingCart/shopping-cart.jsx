import React, { useEffect, useState } from "react";
import { List } from "antd";
import Product from "../Product/product";
import mydb from "../../firestore/MyFirestore";
import PubSub from "pubsub-js";

export default function ShoppingCart() {
  const [productList, setProductList] = useState([]);

  async function getShoppingCartList(){
    // after the component mounts
    // get data
    const list = await mydb.getShoppingCart();
    // set state
    setProductList(list);
  }

  const removeFromCart = async(product) =>{
    await mydb.removeFromCart(product);
    await getShoppingCartList();
  };

  const setupPubSub = () =>{
    const token = PubSub.subscribe("cartRefresh", (msg, data) => {
      console.log("CartRefresh", data);
      getShoppingCartList();
    });
    return token;
  };

  useEffect(() => {
    //doing something async needs to code like this
    getShoppingCartList();
    //use Pubsub to get cart refresh info
    const token = setupPubSub();
    // return a function to clear side effects
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <hr/>
      <List
        style={{height:"100vh"}}
        pagination={{
          pageSize: 10,
        }}
        itemLayout="horizontal"
        dataSource={productList}
        renderItem={(item) => (
          <List.Item>
            <Product item={item} removeFromCart={removeFromCart}></Product>
          </List.Item>
        )}
      />
    </div>
  );
}
