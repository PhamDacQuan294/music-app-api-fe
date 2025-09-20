import { Button, Form, Input, message, Select, Switch, Upload } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import MyEditor from "../../../components/admin/TinymceConfig/index";
import { createSong, createSongPost } from "../../../services/admin/songService";

const { Option } = Select;

function CreateSong() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

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

  const rules = [
    {
      required: true,
      message: 'Bắt buộc'
    },
  ];

  const handleSubmit = async (values) => {
    const response = await createSongPost(values);

    if (response) {
      form.resetFields();
      setFileList([]);
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
  }

  return (
    <>  
      {contextHolder}

      <h2>Thêm bài hát</h2>

      <Form layout="vertical" name="create-song" form={form} onFinish={handleSubmit}>

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
            style={{ width: "100%"}}
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
          initialValue={true}
        >
          <Switch 
            checkedChildren="Hoạt động" 
            unCheckedChildren="Dừng hoạt động" 
            defaultChecked
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