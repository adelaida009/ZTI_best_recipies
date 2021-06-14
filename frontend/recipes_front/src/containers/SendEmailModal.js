import React from "react";
import { Modal, Button, Form, Input } from "antd";

const SendEmailModal = (props) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    props.callback(values);
    handleCancel();
  };

  const onFinishFailed = () => {
    console.log("onFinishFailed");
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Send via email
      </Button>
      <Modal
        title="Send shopping list"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            form="emailForm"
            key="submit"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          id="emailForm"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please input your email address!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SendEmailModal;
