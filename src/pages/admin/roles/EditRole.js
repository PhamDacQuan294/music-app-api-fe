import { Button, Form, Modal, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import RoleFormFields from "./RoleFormFields";

function EditRole({ record }) {
  const [showModal, setShowModal] = useState(false);
  const rules = [{ required: true, message: "Bắt buộc" }];

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        size="small"
        type="primary"
        icon={<EditOutlined />}
        onClick={handleShowModal}
      />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title="Chỉnh sửa nhóm quyền"
        footer={null}
      >
        <Spin>
          <Form
            layout="vertical"
            initialValues={record}
          >
            <RoleFormFields
              rules={rules}
            />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Spin>

      </Modal>
    </>
  )
}

export default EditRole;