import React from "react";
import { Space, Table, Button, Card } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";


export default function ProductList() {
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
        <img width={150} src={image}></img>
      ),
      align:"center",
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

  const data = [
    {
      id: 1,
      key: "1",
      name: "Pizza",
      price: 9.99,
      image: "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    },
  ];

  const title = (<span>Product List</span>);
  const extra = (
    <Button type='primary'>
      <PlusOutlined />
      Add New Product
    </Button>
  );

  return (
    <Card
      title={title}
      extra={extra}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Table 
        rowKey="id"
        columns={columns} 
        dataSource={data} 
        pagination={{defaultPageSize: 5, showQuickJumper: true,}}
        bordered
      />
    </Card>
  );
}

