import React, { useEffect, useState } from "react";
import { Modal, Form, Input } from "antd";
import PropType from "prop-types";

function AddProduct(props) {
  const {isModalOpen, handleCancel, handleOk, formRef, product} = props;
  const [prevProduct, setPrevProduct] = useState(product);

  // when the product in the props changes
  // changes the default value of the form
  useEffect(()=>{
    if(prevProduct != product){
      //indicates this is used as an add modal
      if(product === null){
        formRef.current.setFieldsValue({
          name: "",
          price: "",
          image: "",
        });
      }
      //indicates this is used as an edit modal
      else{
        formRef.current.setFieldsValue({
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
      //store the previous product
      setPrevProduct(product);
    }
  },
  [product]);

  return (
    <Modal 
      title= {product === null ? "Add New Product" : "Edit Product"}
      open={isModalOpen} 
      onOk={handleOk} 
      onCancel={handleCancel}
    >
      <Form
        ref={formRef}
        name="addNewProduct"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
          initialValue={ product ? product.name : "" }
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input product price!",
            },
          ]}
          initialValue={ product ? product.price : "" }
        >
          <Input type="number"/>
        </Form.Item>

        <Form.Item
          label="Image Url"
          name="image"
          rules={[
            {
              required: true,
              message: "Please input product image url!",
            },
          ]}
          initialValue={ product ? product.image : "" }
        >
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
}

AddProduct.propTypes = {
  isModalOpen: PropType.bool.isRequired,
  handleCancel: PropType.func.isRequired,
  handleOk: PropType.func.isRequired,
  formRef: PropType.object.isRequired,
  product: PropType.object,
};

export default AddProduct;
