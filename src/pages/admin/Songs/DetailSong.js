import { Button, Modal, Descriptions } from "antd";
import { FireOutlined } from "@ant-design/icons";
import { useState } from "react";

function DetailSong({ record }) {
  const [showModal, setShowModal] = useState(false);

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
        icon={<FireOutlined />}
        onClick={handleShowModal}
      >
      </Button>

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title="Chi tiết bài hát"
        footer={null}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Tên bài hát">{record.title}</Descriptions.Item>
          <Descriptions.Item label="Ca sĩ">{record.singerName}</Descriptions.Item>
          <Descriptions.Item label="Chủ đề">{record.topicName}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {record.status ? "Hoạt động" : "Dừng"}
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            <div
              dangerouslySetInnerHTML={{ __html: record.description }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh đại diện">
            <img
              src={record.avatar}
              alt="avatar"
              style={{ width: 100, borderRadius: 8 }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Audio">
            {record.audio ? (
              <audio controls src={record.audio} style={{ width: "100%" }} />
            ) : (
              "Chưa có"
            )}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
}

export default DetailSong;
