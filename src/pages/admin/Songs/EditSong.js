import { Button, Form, Modal, notification, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { updateSong } from "../../../services/admin/songService";
import SongFormFields from "./SongFormFields";
import { useDispatch } from "react-redux";
import { editSongAction } from "../../../actions/admin/songs.actions";

function EditSong({ record }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [fileListAudio, setFileListAudio] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const [notiApi, contextHolder] = notification.useNotification();

  const rules = [{ required: true, message: "Bắt buộc" }];

  const handleShowModal = () => {
    setFileList(record.avatar ? [{ url: record.avatar }] : []);
    setFileListAudio(record.audio ? [{ url: record.audio }] : []);
    setAudioUrl(record.audio || null);
    setShowModal(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setFileListAudio([]);
    setAudioUrl(null);
    setShowModal(false);
  };

  const appendFileToForm = (formData, key, fileList) => {
    if (fileList.length > 0) {
      const file = fileList[0];
      if (file.originFileObj) {
        formData.append(key, file.originFileObj);
      } else if (file.url) {
        formData.append(key, file.url);
      }
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("topicId", values.topicId);
    formData.append("singerId", values.singerId);
    formData.append("lyrics", values.lyrics || "");
    formData.append("description", values.description || "");
    formData.append("status", values.status ? "true" : "false");
    formData.append("position", values.position);

    appendFileToForm(formData, "avatar", fileList);
    appendFileToForm(formData, "audio", fileListAudio);

    setSpinning(true);
    try {
      const response = await updateSong(record._id, formData);
      if (response?.code === 200) {
        notiApi.success({
          message: "Cập nhật thành công",
          description: "Bạn đã cập nhật bài hát thành công",
        });
        dispatch(editSongAction(response));
        setShowModal(false);
      } else {
        notiApi.error({
          message: "Cập nhật thất bại",
          description: "Không thể cập nhật bài hát",
        });
      }
    } catch (error) {
      notiApi.error({
        message: "Lỗi server",
        description: "Vui lòng thử lại sau",
      });
    }
    setSpinning(false);
  };

  const handleAudioChange = ({ fileList: newFileList }) => {
    setFileListAudio(newFileList);
    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      setAudioUrl(URL.createObjectURL(newFileList[0].originFileObj));
    } else {
      setAudioUrl(newFileList[0]?.url || null);
    }
  };

  return (
    <>
      {contextHolder}
      <Button
        size="small"
        type="primary"
        icon={<EditOutlined />}
        onClick={handleShowModal}
      />

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title="Chỉnh sửa bài hát"
        footer={null}
      >
        <Spin spinning={spinning} tip="Đang cập nhật...">
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
            initialValues={record}
          >
            <SongFormFields
              fileList={fileList}
              fileListAudio={fileListAudio}
              audioUrl={audioUrl}
              handleChange={({ fileList }) => setFileList(fileList)}
              handleAudioChange={handleAudioChange}
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
  );
}

export default EditSong;
