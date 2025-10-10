import { Button, Form, message } from "antd";
import { useState } from "react";
import { createSongPost } from "../../../services/admin/songService";
import SongFormFields from "./SongFormFields";

function CreateSong() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileListAudio, setFileListAudio] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [audioUrl, setAudioUrl] = useState(null); // State để lưu URL audio

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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

  const rules = [
    {
      required: true,
      message: 'Bắt buộc'
    },
  ];

  const handleSubmit = async (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("topicId", values.topicId);
    formData.append("singerId", values.singerId);
    formData.append("lyrics", values.lyrics || "");
    formData.append("description", values.description || "");
    formData.append("status", values.status ? "true" : "false");
    formData.append("position", values.position || "");

    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }
    
    if (fileListAudio.length > 0) {
      formData.append("audio", fileListAudio[0].originFileObj);
    }

    try {
      const response = await createSongPost(formData);

      if (response.data.code === 200) {
        form.resetFields();
        setFileList([]);
        setFileListAudio([]);
        setAudioUrl(null);

        setTimeout(() => {
          messageApi.open({
            type: "success",
            content: "Tạo bài hát mới thành công",
            duration: 5,
          });
        }, 0);
      } else if (response.data.code === 400) {
        messageApi.open({
          type: "error",
          content: response.data.message,
          duration: 5,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Tạo bài hát mới không thành công",
          duration: 5,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Có lỗi kết nối server!",
        duration: 5,
      });
    }
  };


  return (
    <>
      {contextHolder}

      <h2>Thêm bài hát</h2>

      <Form layout="vertical" name="create-song" form={form} onFinish={handleSubmit} initialValues={{ status: true }}>

        <SongFormFields
          fileList={fileList}
          fileListAudio={fileListAudio}
          audioUrl={audioUrl}
          handleChange={handleChange}
          handleAudioChange={handleAudioChange}
          rules={rules}
        />

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </Form.Item>

      </Form>
    </>
  )
}

export default CreateSong;