import React, { useEffect, useRef, useState } from "react";
import { Space, Table, Button, Card } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import PubSub from "pubsub-js";

import mydb from "../../firestore/MyFirestore";
import AddProduct from "../AddProduct/add-product";

export default function ProductList() {
  const formRef = useRef();
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);

  // set columns of the antd table
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      align:"center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align:"center",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img style={{width:"100%", minWidth:50, maxWidth:100}} src={image}></img>
      ),
      align:"center",
      width:"30%"
    },
    {
      title: "Action",
      key: "action",
      render: (product) => (
        <Space size="middle">
          <a onClick={() => addToCart(product)}>Add to Cart</a>
          <br></br>
          <a onClick={() => openEditProduct(product)}>Edit</a>
        </Space>
      ),
      align:"center",
    },
  ];
  
  const addToCart = async(product) => {
    await mydb.addToCart(product);
    // notify the shopping cart to refresh
    PubSub.publish("cartRefresh", true);
  };

  const openAddProduct = () => {
    setProduct(null);
    setIsModalOpen(true);
  };

  const openEditProduct = (product) => {
    setProduct(product);
    setIsModalOpen(true);
  };

  async function getProductList(){
    // after the component mounts
    // console.log("Component mounted");
    // get data
    const list = await mydb.getProductList();
    // console.log(list);
    // set state
    setProductList(list);
  }

  // get data from database after component mounts
  useEffect(() => {
    //doing something async needs to code like this
    //instead of making the arrow function async
    //need to code a new asynce function
    getProductList();
    // return a function to clear side effects
    return () => {
      // console.log("Component unmounted");
    };
  }, []);

  // information for the card
  const title = (<span>Product List</span>);
  const extra = (
    <Button onClick={() => openAddProduct()} type='primary'>
      <PlusOutlined />
      Add New Product
    </Button>
  );

  // handle cancel of the add new product modal
  const handleCancel = () => {
    // reset all the inputs
    formRef.current.resetFields();
    // close the modal
    setIsModalOpen(false);
  };

  // handle ok of the add new product modal
  const handleOk = () => {
    // if adding new product
    if(product === null){
      // add to the firebase
      formRef.current.validateFields()
        .then(async(values)=>{
          // console.log(values);
          const newPrice = 1 * values.price;
          const newProduct = {...values, price:newPrice };
          await mydb.addNewProduct(newProduct);
          getProductList();
          // reset all the inputs
          formRef.current.resetFields();
          // close the modal
          setIsModalOpen(false);  
        })
        .catch((err)=>{
          console.log(err);
        }); 
    }
    // updating an existed product
    else{
      // update the doc in the firebase
      formRef.current.validateFields()
        .then(async(values)=>{
          const updateID = product.id;
          const updatePrice = 1 * values.price;
          const updateProduct = {...values, price:updatePrice, id:updateID };
          // console.log("Update Product", updateProduct, "Prev Product", product);
          await mydb.updateProduct(updateProduct);
          getProductList();
          // reset all the inputs
          formRef.current.resetFields();
          // close the modal
          setIsModalOpen(false);  
        })
        .catch((err)=>{
          console.log(err);
        }); 
    }
  };


  return (
    <Card
      title={title}
      extra={extra}
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto"
      }}
    >
      <Table
        rowKey="id"
        columns={columns} 
        dataSource={productList} 
        pagination={{defaultPageSize: 4, showQuickJumper: true,}}
        bordered
      />
      <AddProduct 
        isModalOpen={isModalOpen} 
        handleOk={handleOk} 
        handleCancel={handleCancel}
        formRef={formRef}
        product={product}
      />
    </Card>
  );
}
