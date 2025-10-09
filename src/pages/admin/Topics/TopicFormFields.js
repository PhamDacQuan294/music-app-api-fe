import { Form, Input, Upload, Switch, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MyEditor from "../../../components/admin/TinymceConfig";

function TopicFormFields({ fileList, handleChange, rules }) {
  return (
    <>
      <Form.Item label="Tiêu đề" name="title" rules={rules}>
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <MyEditor />
      </Form.Item>

      <Form.Item label="Ảnh" name="avatar">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false}
          accept="image/*"
        >
          {fileList.length >= 1 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item label="Vị trí" name="position">
        <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập vị trí hiển thị" />
      </Form.Item>

      <Form.Item
        label="Trạng thái"
        name="status"
        valuePropName="checked"
      >
        <Switch checkedChildren="Hoạt động" unCheckedChildren="Dừng hoạt động" />
      </Form.Item>
    </>
  )
}

export default TopicFormFields;