import { Button, Form, message } from "antd";
import RoleFormFields from "./RoleFormFields";
import { createRolePost } from "../../../services/admin/rolesService";

function RoleCreateForm() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const rules = [
    {
      required: true,
      message: 'Bắt buộc'
    },
  ];

  const handleSubmit = async (values) => {
    try {
      const response = await createRolePost(values);

      if (response.code === 200) {
        form.resetFields();
        setTimeout(() => {
          messageApi.open({
            type: "success",
            content: "Tạo nhóm quyền mới thành công",
            duration: 5,
          });
        }, 0);
      } else if (response.code === 400) {
        messageApi.open({
          type: "error",
          content: response.data.message,
          duration: 5,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Tạo nhóm quyền mới không thành công",
          duration: 5,
        });
      }
    } catch (error) {
      console.log(error);

      messageApi.open({
        type: "error",
        content: "Có lỗi kết nối server!",
        duration: 5,
      });
    }
  }

  return (
    <>
      {contextHolder}

       <h2>Thêm nhóm quyền</h2>

      <Form layout="vertical" name="create-role" form={form} onFinish={handleSubmit}>
        <RoleFormFields
          rules={rules}
        />

        <Form.Item className="form-submit">
          <Button type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default RoleCreateForm;
