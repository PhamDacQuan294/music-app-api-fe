import { changeStatus } from "../../../services/admin/changeStatusService";

export const hanleStatusChange = async (record, type, songContexts) => {
  const newStatus = record.status === "active" ? "inactive" : "active";

  try {
    const data = await changeStatus(newStatus, record._id, type);
 
    if (data.code === 200) {
      songContexts.onReload(data.status);
      songContexts.messageApi.success("Cập nhật trạng thái thành công");
    } else {
      songContexts.messageApi.error("Cập nhật trạng thái thất bại");
    }
  } catch (error) {
    songContexts.messageApi.error("Lỗi hệ thống, vui lòng thử lại");
  }
}

