import React from "react";
import { Card, Button } from "antd";

const { Meta } = Card;

export default function Product(prop) {
  const {name, price, imgUrl} = prop;
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="image" src={imgUrl} />}
    >
      <Meta title={name} description={`$${price}`} />
      <Button type="primary">Add to Cart</Button> 
    </Card>
  );
}
