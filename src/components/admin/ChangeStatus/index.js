import { changeStatus } from "../../../services/admin/changeStatusService";

export const hanleStatusChange = async (record, type, messageApi, changeStatusType) => {
  const newStatus = record.status === "active" ? "inactive" : "active";
  
  try {
    const data = await changeStatus(newStatus, record._id, type);

    if (data.code === 200) {
      messageApi.success("Cập nhật trạng thái thành công");
      changeStatusType(data);
    } else {
      messageApi.error("Cập nhật trạng thái thất bại");
    }
  } catch (error) {
    console.log(error);
    messageApi.error("Lỗi hệ thống, vui lòng thử lại");
  }
}

