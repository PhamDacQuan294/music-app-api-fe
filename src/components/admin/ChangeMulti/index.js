import { Button, Form, Select, message, Modal } from "antd";
import { ChangeMulti } from "../../../services/admin/changeStatusService";
import { useDispatch } from "react-redux";
import { changeMultiStatus } from "../../../actions/admin/changeMulti.action";

const { Option } = Select;

export const ChangeStatusMulti = ({ selectedRowKeys, type }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const typeChangeMulti = type.toUpperCase();

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
    
    // Nếu chọn xoá → confirm
    if (status === "delete-all") {
      Modal.confirm({
        title: "Xác nhận xoá",
        content: "Bạn có chắc chắn muốn xoá tất cả bản ghi đã chọn không?",
        okText: "Xoá",
        cancelText: "Huỷ",
        okType: "danger",
        onOk: async () => {
          await callApi(status);
        },
      });
    } else {
      await callApi(status);
    }
  };

  const callApi = async (status) => {
    try {
      const result = await ChangeMulti(type, {
        ids: selectedRowKeys,
        status,
      });

      console.log(result);

      if (result.code === 200) {
        if (status === "delete-all") {
          message.success("Xoá thành công!");
        } else {
          message.success("Cập nhật thành công!");
        }
        dispatch(changeMultiStatus(typeChangeMulti, { newType: result.newType, status }));
      } else {
        message.error("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error(error);
      message.error("Lỗi server!");
    }
  };

  return (
    <Form form={form} layout="inline">
      <Form.Item name="status" style={{ width: 200 }}>
        <Select placeholder="Chọn hành động">
          <Option value="active">Hoạt động</Option>
          <Option value="inactive">Dừng hoạt động</Option>
          <Option value="delete-all">Xoá tất cả</Option>
          <Option value="change-position">Thay đổi vị trí</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Áp dụng
        </Button>
      </Form.Item>
    </Form>
  );
};
