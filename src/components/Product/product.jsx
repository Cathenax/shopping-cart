import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

export default function Product(props) {
  const {item, removeFromCart} = props;
  const {name, price, number} = item;
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
        <span>number:{number}</span>
      </div>
      <div>
        <Button type="primary" onClick={() => removeFromCart(item)}>Remove</Button>
      </div>
    </div>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};