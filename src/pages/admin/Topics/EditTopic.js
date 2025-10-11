import { Button, Form, Modal, notification, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import TopicFormFields from "./TopicFormFields";
import { useDispatch } from "react-redux";
import { updateTopic } from "../../../services/admin/topicsService";
import { editTopicAction } from "../../../actions/admin/topics.actions";
import { appendFileToForm } from "../../../helpers/appendFileToForm";

function EditTopic({ record }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [showModal, setShowModal] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [notiApi, contextHolder] = notification.useNotification();

  const rules = [{ required: true, message: "Bắt buộc" }];

  const handleShowModal = () => {
    setShowModal(true);
    setFileList(record.avatar ? [{ url: record.avatar }] : []);
  };

  const handleCancel = () => {
    setShowModal(false);
    setFileList([]);
  };


  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description || "");
    formData.append("status", values.status ? "true" : "false");
    formData.append("position", values.position);

    appendFileToForm(formData, "avatar", fileList);
    setSpinning(true);
    try {
      const response = await updateTopic(record._id, formData);
      if (response?.code === 200) {
        notiApi.success({
          message: "Cập nhật thành công",
          description: "Bạn đã cập nhật chủ đề thành công",
        });
        dispatch(editTopicAction(response));
        setShowModal(false);
      } else {
        notiApi.error({
          message: "Cập nhật thất bại",
          description: "Không thể cập nhật chủ đề",
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
        title="Chỉnh sửa chủ đề"
        footer={null}
      >
        <Spin spinning={spinning} tip="Đang cập nhật...">
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            form={form}
            initialValues={record}
          >
            <TopicFormFields
              fileList={fileList}
              handleChange={({ fileList }) => setFileList(fileList)}
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

export default EditTopic;