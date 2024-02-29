import React, { useEffect, useState } from "react";
import { List } from "antd";
import Product from "../Product/product";
import mydb from "../../firestore/MyFirestore";

export default function ShoppingCart() {
  const [productList, setProductList] = useState([]);
  // useEffect(updateList, mydb.getShoppingCart());
  // const updateList = () => {
  // }
  useEffect(() => {
    //doing something async needs to code like this
    async function getShoppingCartList(){
      // after the component mounts
      console.log("Component mounted");
      // get data
      const list = await mydb.getShoppingCart();
      console.log(list);
      // set state
      setProductList(list);
    }
    getShoppingCartList();
    // return a function to clear side effects
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  // const data = [
  //   {
  //     id: 1,
  //     key: "1",
  //     name: "Pizza",
  //     price: 9.99,
  //     image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
  //   },
  //   {
  //     id: 1,
  //     key: "1",
  //     name: "Pizza",
  //     price: 9.99,
  //     image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
  //   },
  //   {
  //     id: 1,
  //     key: "1",
  //     name: "Pizza",
  //     price: 9.99,
  //     image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
  //   },
  //   {
  //     id: 1,
  //     key: "1",
  //     name: "Pizza",
  //     price: 9.99,
  //     image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
  //   },
  //   {
  //     id: 1,
  //     key: "1",
  //     name: "Pizza",
  //     price: 9.99,
  //     image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
  //   },
  // ];
  
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
            <Product item={item}></Product>
          </List.Item>
        )}
      />
    </div>
  );
}
