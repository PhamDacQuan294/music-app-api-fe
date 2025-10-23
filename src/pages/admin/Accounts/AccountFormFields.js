import { Col, Form, Input, Radio, Row, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Option } = Select;

function AccountFormFields({ fileList, handleChange }) {
  const { listRoles } = useSelector((state) => state.admin.roles);

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="fullName"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ tên" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Số điện thoại">
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
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
        </Col>

        <Col span={12}>
          <Form.Item
            name="role_id" 
            label="Phân quyền" 
            rules={[{ required: true, message: "Vui lòng chọn phân quyền!" }]}
          >
            <Select
              placeholder="-- Phân quyền --"
              style={{ width: "100%" }}
              popupRender={(menu) => (
                <div style={{ maxHeight: 200, overflowY: "auto" }}>{menu}</div>
              )}
            >
              {listRoles.records?.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="status" label="Trạng thái">
            <Radio.Group>
              <Radio value="active">Hoạt động</Radio>
              <Radio value="inactive">Dừng hoạt động</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default AccountFormFields;