import { Button, Form, message } from "antd";
import { useEffect, useState } from "react";
import { createSong, createSongPost } from "../../../services/admin/songService";
import SongFormFields from "./SongFormFields";

function CreateSong() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileListAudio, setFileListAudio] = useState([]);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [audioUrl, setAudioUrl] = useState(null); // State để lưu URL audio

  useEffect(() => {
    const fetchData = async () => {
      const data = await createSong();
      setData(data);
    }
    fetchData();
  }, []);

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

    // append text fields
    formData.append("title", values.title);
    formData.append("topicId", values.topicId);
    formData.append("singerId", values.singerId);
    formData.append("lyrics", values.lyrics || "");
    formData.append("description", values.description || "");
    formData.append("status", values.status ? "true" : "false");

    // append avatar (nếu có chọn)
    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj);
    }

    // append audio (nếu có chọn)
    if (fileListAudio.length > 0) {
      formData.append("audio", fileListAudio[0].originFileObj);
    }

    const response = await createSongPost(formData);

    if (response) {
      form.resetFields();
      setFileList([]);
      setFileListAudio([]);
      setAudioUrl(null);
      messageApi.open({
        type: "success",
        content: "Tạo bài hát mới thành công",
        duration: 5,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Tạo bài hát mới không thành công",
        duration: 5,
      });
    }
  };


  return (
    <>
      {contextHolder}

      <h2>Thêm bài hát</h2>

      <Form layout="vertical" name="create-song" form={form} onFinish={handleSubmit}  initialValues={{ status: true }}>
        
        <SongFormFields 
          topics={data?.topics}
          singers={data?.singers}
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