import { Button, Form, message } from "antd";
import TopicFormFields from "./TopicFormFields";
import { useState } from "react";
import { createTopicPost } from "../../../services/admin/topicsService";
import { useDispatch } from "react-redux";
import { createTopicAction } from "../../../actions/admin/topics.actions";

function CreateTopic() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
    formData.append("description", values.description || "");
    formData.append("position", values.position || "");
    formData.append("status", values.status ? "true" : "false");

    if (fileList.length > 0) {
      formData.append("avatar", fileList[0].originFileObj)
    }

    try {
      const response = await createTopicPost(formData);

      console.log(response);

      if (response.code === 200) {
        form.resetFields();
        setFileList([]);
        dispatch(createTopicAction(response.topic));
        setTimeout(() => {
          messageApi.open({
            type: "success",
            content: "Tạo chủ đề mới thành công",
            duration: 5,
          });
        }, 0);
      } else if (response.code === 400) {
        messageApi.open({
          type: "error",
          content: response.message,
          duration: 5,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Tạo chủ đề mới không thành công",
          duration: 5,
        });
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Có lỗi kết nối server!",
        duration: 5,
      });
    }
  }

  return (
    <>
      {contextHolder}

      <h2>Thêm chủ đề</h2>

      <Form layout="vertical" name="create-song" form={form} onFinish={handleSubmit} initialValues={{ status: true }}>
        <TopicFormFields
          fileList={fileList}
          handleChange={handleChange}
          rules={rules}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateTopic;