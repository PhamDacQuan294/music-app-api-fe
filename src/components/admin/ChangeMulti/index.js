import { Button, Form, Select, message } from "antd";
import { ChangeMulti } from "../../../services/admin/changeStatusService";

const { Option } = Select;

export const ChangeStatusMulti = ({ selectedRowKeys, type, songContexts }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const { status } = form.getFieldsValue();
    
    if (!status) {
      message.warning("Vui lòng chọn trạng thái!");
      return;
    }

    if (selectedRowKeys.length === 0) {
      message.warning("Vui lòng chọn ít nhất một bản ghi!");
      return;
    }

    try {
      const result = await ChangeMulti(type, {
        ids: selectedRowKeys,
        status,
      })

      if (result.code === 200) {
        message.success("Cập nhật thành công!");
        songContexts.onReload();
      } else {
        message.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error(error);
      message.error("Lỗi server!");
    }

  }

  return (
    <Form form={form} layout="inline">
      <Form.Item name="status" style={{ width: 200 }}>
        <Select placeholder="Chọn hành động">
          <Option value="active">Hoạt động</Option>
          <Option value="inactive">Dừng hoạt động</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Áp dụng
        </Button>
      </Form.Item>
    </Form>
  );
}