import { Form, Input, Select, Upload, Button, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import MyEditor from "../../../components/admin/TinymceConfig";

const { Option } = Select;

function SongFormFields({
  topics,
  singers,
  fileList,
  fileListAudio,
  audioUrl,
  handleChange,
  handleAudioChange,
  rules,
}) {
  return (
    <>
      <Form.Item label="Tiêu đề" name="title" rules={rules}>
        <Input />
      </Form.Item>

      <Form.Item label="Chủ đề" name="topicId" rules={rules}>
        <Select
          placeholder="-- Chọn chủ đề --"
          style={{ width: "100%" }}
          popupRender={(menu) => (
            <div style={{ maxHeight: 200, overflowY: "auto" }}>{menu}</div>
          )}
        >
          {topics?.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Ca sĩ" name="singerId" rules={rules}>
        <Select
          placeholder="-- Chọn ca sĩ --"
          style={{ width: "100%" }}
          popupRender={(menu) => (
            <div style={{ maxHeight: 200, overflowY: "auto" }}>{menu}</div>
          )}
        >
          {singers?.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.fullName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Ảnh" name="avatar">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          beforeUpload={() => false}
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

      <Form.Item label="File nhạc" name="audio">
        <div>
          <Upload
            fileList={fileListAudio}
            onChange={handleAudioChange}
            beforeUpload={() => false}
            accept="audio/*"
          >
            {fileListAudio.length >= 1 ? null : (
              <Button icon={<PlusOutlined />}>Upload Audio</Button>
            )}
          </Upload>

          {audioUrl && (
            <div style={{ marginTop: 10 }}>
              <audio controls style={{ width: "100%" }}>
                <source src={audioUrl} type="audio/mpeg" />
              </audio>
            </div>
          )}
        </div>
      </Form.Item>


      <Form.Item label="Lời bài hát" name="lyrics">
        <TextArea />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <MyEditor />
      </Form.Item>

      <Form.Item
        label="Trạng thái"
        name="status"
        valuePropName="checked"
        rules={rules}
      >
        <Switch checkedChildren="Hoạt động" unCheckedChildren="Dừng hoạt động" />
      </Form.Item>
    </>
  );
}

export default SongFormFields;
