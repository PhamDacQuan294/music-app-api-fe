import { Button, Form } from "antd";
import RoleFormFields from "./RoleFormFields";

function RoleCreateForm() {
  const rules = [
    {
      required: true,
      message: 'Bắt buộc'
    },
  ];

  return (
    <>
      <Form layout="vertical" name="create-role" initialValues={{ status: true }}>
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
