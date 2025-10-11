import { Button, Descriptions, Modal } from "antd";
import { FireOutlined } from "@ant-design/icons";
import { useState } from "react";

function DetailTopic({ record }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  }

  return (
    <>
      <Button 
        size="small" 
        type="primary" 
        icon={<FireOutlined />}
        onClick={handleShowModal}
      />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title="Chi tiết chủ đề"
        footer={null}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên chủ đề">{record.title}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {record.status ? "Hoạt động" : "Dừng"}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh đại diện">
            <img
              src={record.avatar}
              alt="avatar"
              style={{ width: 100, borderRadius: 8 }}
            />
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}

export default DetailTopic;