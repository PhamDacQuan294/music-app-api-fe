import { Button, Form, Input, message, Select, Switch, Upload } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import MyEditor from "../../../components/admin/TinymceConfig/index";
import { createSong, createSongPost } from "../../../services/admin/songService";

const { Option } = Select;

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

        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={rules}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Chủ đề" name="topicId" rules={rules}>
          <Select
            placeholder="-- Chọn chủ đề --"
            style={{ width: "100%" }}
            popupRender={(menu) => (
              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                {menu}
              </div>
            )}
          >
            {data?.topics?.map((item) => (
              <Option key={item._id} value={item._id}>{item.title}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ca sĩ" name="singerId" rules={rules}>
          <Select
            placeholder="-- Chọn ca sĩ --"
            style={{ width: "100%" }}
            popupRender={(menu) => (
              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                {menu}
              </div>
            )}
          >
            {data?.singers?.map((item) => (
              <Option key={item._id} value={item._id}>{item.fullName}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ảnh"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload
            listType="picture-card" // hiển thị thumbnail
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false} // chặn upload tự động, chỉ preview
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

        <Form.Item
          label="File nhạc"
          name="audio"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Upload
            fileList={fileListAudio}
            onChange={handleAudioChange}
            beforeUpload={() => false} // không upload ngay, chỉ preview
            accept="audio/*"
          >
            {fileListAudio.length >= 1 ? null : (
              <Button icon={<PlusOutlined />}>Upload Audio</Button>
            )}

            {/* Nếu có file audio, hiển thị player để nghe thử */}
            {audioUrl && (
              <div style={{ marginTop: 10 }}>
                <audio controls>
                  <source src={audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            )}
          </Upload>

        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
        >
          <MyEditor />
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          valuePropName="checked"
          rules={rules}
        >
          <Switch
            checkedChildren="Hoạt động"
            unCheckedChildren="Dừng hoạt động"
          />
        </Form.Item>


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