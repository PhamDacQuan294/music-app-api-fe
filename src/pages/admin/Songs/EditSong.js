import { Button, Form, Modal, notification, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { updateSong } from "../../../services/admin/songService"

import SongFormFields from "./SongFormFields";

function EditSong(props) {
  const { record, topics, singers, onReload } = props;
  const [fileList, setFileList] = useState([]);
  const [fileListAudio, setFileListAudio] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [notiApi, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);

  const handleShowModal = () => {

    if (record.avatar) {
      setFileList([
        {
          url: record.avatar,
        }
      ]);
    } else {
      setFileList([]);
    }

    if (record.audio) {
      setFileListAudio([
        {
          url: record.audio,
        },
      ]);
      setAudioUrl(record.audio);
    } else {
      setFileListAudio([]);
      setAudioUrl(null);
    }

    setShowModal(true);
  }

  const handleCancel = () => {
    setShowModal(false);
    form.resetFields();
  }

  const rules = [
    {
      required: true,
      message: 'Bắt buộc'
    },
  ];

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("topicId", values.topicId);
    formData.append("singerId", values.singerId);
    formData.append("lyrics", values.lyrics || "");
    formData.append("description", values.description || "");
    formData.append("status", values.status ? "true" : "false");

    if (fileList.length > 0) {
      if (fileList[0].originFileObj) {
        formData.append("avatar", fileList[0].originFileObj);
      } else if (fileList[0].url) {
        formData.append("avatar", fileList[0].url); // giữ link cũ
      }
    }

    if (fileListAudio.length > 0) {
      if (fileListAudio[0].originFileObj) {
        formData.append("audio", fileListAudio[0].originFileObj);
      } else if (fileListAudio[0].url) {
        formData.append("audio", fileListAudio[0].url);
      }
    }

    setSpinning(true);
    
    const response = await updateSong(record._id, formData);
    setTimeout(() => {
      if (response) {
        notiApi.success({
          message: 'Cập nhật thành công',
          description: `Bạn đã cập nhật bài hát thành công ${record.title}`
        });
        setShowModal(false);
        onReload();
      } else {
        notiApi.error({
          message: 'Cập nhật thất bại',
          description: `Bạn đã cập nhật bài hát thất bại ${record.title}`
        });
      }
      setSpinning(false);
    }, 3000);
  };

  const handleAudioChange = ({ fileList: newFileList }) => {
    setFileListAudio(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      setAudioUrl(URL.createObjectURL(file)); // Tạo URL audio để phát thử
    } else {
      setAudioUrl(null); // Reset audioUrl nếu không có file nào
    }
  };

  return (
    <>
      {contextHolder}
      <Button size="small" type="primary" icon={<EditOutlined />} onClick={handleShowModal} />

      <Modal open={showModal} onCancel={handleCancel} title="Chỉnh sửa bài hát" footer={null}>
        <Spin spinning={spinning} tip="Đang cập nhật">
          <Form layout="vertical" name="edit-song" onFinish={handleSubmit} form={form} initialValues={record}>
            <SongFormFields
              topics={topics}
              singers={singers?.singers}
              fileList={fileList}
              fileListAudio={fileListAudio}
              audioUrl={audioUrl}
              handleChange={handleChange}
              handleAudioChange={handleAudioChange}
              rules={rules}
            />
            <Form.Item label={null}>
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

export default EditSong;