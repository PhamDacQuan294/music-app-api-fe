import { Button, Card, Form, message } from "antd";
import AccountFormFields from "./AccountFormFields";
import { useState } from "react";
import { useFetchRoles } from "../../../hooks/admin/useFetchRoles";
import { createAccountPost } from "../../../services/admin/accountsService";

function CreateAccount() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useFetchRoles();

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("phone", values.phone || "");
    formData.append("role_id", values.role_id);
    formData.append("status", values.status);

    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj)
    }

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await createAccountPost(formData);

      if (response.data.code === 200) {
        form.resetFields();
        setFileList([]);

        setTimeout(() => {
          messageApi.open({
            type: "success",
            content: `${response.data.message}`,
            duration: 5,
          });
        }, 0);
      } else if (response.data.code === 400) {
        setTimeout(() => {
          messageApi.open({
            type: "error",
            content: `${response.data.message}`,
            duration: 5,
          });
        }, 0);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Có lỗi kết nối server!",
        duration: 5,
      });
    }
  };

  return (
    <>
      {contextHolder}

      <Card
        title={<span style={{ fontWeight: 600 }}>Thêm mới tài khoản</span>}
      >
        <Form layout="vertical" name="create-account" form={form} onFinish={handleSubmit} initialValues={{ status: true }}>
          <AccountFormFields
            fileList={fileList}
            handleChange={handleChange}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default CreateAccount;