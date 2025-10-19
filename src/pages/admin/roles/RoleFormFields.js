import { Form, Input } from "antd";
import MyEditor from "../../../components/admin/TinymceConfig";

function RoleFormFields({ rules }) {
  return (
    <>
      <Form.Item label="Tiêu đề" name="title" rules={rules}>
        <Input />
      </Form.Item>
      
      <Form.Item label="Mô tả" name="description">
        <MyEditor />
      </Form.Item>
    </>
  )
}

export default RoleFormFields;