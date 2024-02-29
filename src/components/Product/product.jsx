import React from "react";
import { Button } from "antd";

export default function Product(prop) {
  const {name, price} = prop.item;
  return (
    <div 
      style={{
        width:"100%"
      }}
    >
      <div>
        <span style={{marginRight:"10px"}}>{name}</span>
        <span>${price}</span>
      </div>
      <div>
        <Button type="primary">Remove</Button>
      </div>
    </div>
  );
}
