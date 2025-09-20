import { Button, Form, Input, Modal, notification, Select, Spin, Switch, Upload } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { updateSong } from "../../../services/admin/songService"
import MyEditor from "../../../components/admin/TinymceConfig";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

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
          url: record.avatar, // ĐÂY LÀ ĐIỂM QUAN TRỌNG
        }
      ]);
    } else {
      setFileList([]);
    }

    // Xử lý audio
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

    setSpinning(true);
    console.log("Đã gửi");
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
                {topics?.map((item) => (
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
                {singers?.singers?.map((item) => (
                  <Option key={item._id} value={item._id}>{item.fullName}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Ảnh" name="avatar">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false} // Ngăn upload tự động
                accept="image/*"
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item label="File nhạc">
              <Upload
                fileList={fileListAudio}
                onChange={handleAudioChange}
                beforeUpload={() => false}
                accept="audio/*"
              >
                {fileListAudio.length >= 1 ? null : (
                  <Button icon={<PlusOutlined />}>Tải file nhạc</Button>
                )}
              </Upload>

              {/* Audio preview nếu có file */}
              {audioUrl && (
                <div style={{ marginTop: 10 }}>
                  <audio controls style={{ width: "100%" }}>
                    <source src={audioUrl} type="audio/mpeg" />
                    Trình duyệt không hỗ trợ phát audio.
                  </audio>
                </div>
              )}
            </Form.Item>



            <Form.Item
              label="Lời bài hát"
              name="lyrics"
            >
              <TextArea />
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