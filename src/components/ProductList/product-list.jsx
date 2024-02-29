import React, { useEffect, useState } from "react";
import { Space, Table, Button, Card } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";

import mydb from "../../firestore/MyFirestore";
import AddProduct from "../AddProduct/add-product";

export default function ProductList() {
  let addFormRef = React.createRef();
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
      render: () => (
        <Space size="middle">
          <a>Add to Cart</a>
          <br></br>
          <a>Edit</a>
        </Space>
      ),
      align:"center",
    },
  ];
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getProductList(){
    // after the component mounts
    console.log("Component mounted");
    // get data
    const list = await mydb.getProductList();
    console.log(list);
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
      console.log("Component unmounted");
    };
  }, []);

  // information for the card
  const title = (<span>Product List</span>);
  const extra = (
    <Button onClick={() => setIsModalOpen(true)} type='primary'>
      <PlusOutlined />
      Add New Product
    </Button>
  );

  // handle cancel of the add new product modal
  const handleCancel = () => {
    // console.log(addFormRef);
    // reset all the inputs
    addFormRef.current.resetFields();
    // close the modal
    setIsModalOpen(false);
  };

  // handle ok of the add new product modal
  const handleOk = () => {
    // add to the firebase
    addFormRef.current.validateFields()
      .then(async(values)=>{
        // console.log(values);
        await mydb.addNewProduct(values);
        getProductList();
        // reset all the inputs
        addFormRef.current.resetFields();
        // close the modal
        setIsModalOpen(false);  
      })
      .catch((err)=>{
        console.log(err);
      }); 
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
        formRef={addFormRef}
      />
    </Card>
  );
}

