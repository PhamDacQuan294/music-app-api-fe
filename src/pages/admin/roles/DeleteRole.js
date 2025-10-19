import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteRole } from "../../../services/admin/rolesService";
import { deleteRoleAction } from "../../../actions/admin/roles.action";

function DeleteRole({ record, messageApi }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const response = await deleteRole(record._id);

    if (response.code === 200) {
      messageApi.success({
        content: 'Xoá nhóm quyền thành công',
        duration: 5,
      });
      dispatch(deleteRoleAction(response))
    } else {
      messageApi.error({
        content: 'Xoá nhóm quyền chưa thành công',
        duration: 5,
      });
    }
  }
  return (
    <>
      <Popconfirm title="Sure to delete?" onConfirm={handleDelete}>
        <Button danger size="small" icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  )
}

export default DeleteRole;