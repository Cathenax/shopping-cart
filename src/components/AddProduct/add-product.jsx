import React from "react";
import { Modal, Form, Input } from "antd";
import PropType from "prop-types";

function AddProduct(props) {
  const {isModalOpen, handleCancel, handleOk, formRef} = props;

  return (
    <Modal 
      title="Add New Product" 
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
        >
          <Input/>
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
};

export default AddProduct;
