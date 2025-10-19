import { Button, Descriptions, Modal } from "antd";
import { FireOutlined } from "@ant-design/icons";
import { useState } from "react";


function DetailRole({ record }) {
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
        title="Chi tiết nhóm quyền"
        footer={null}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên chủ đề">{record.title}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}

export default DetailRole;