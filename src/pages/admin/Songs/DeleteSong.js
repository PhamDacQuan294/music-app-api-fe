import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSong } from "../../../services/admin/songService";
import { useDispatch } from "react-redux";
import { deleteSongAction } from "../../../actions/admin/songs.actions";

function DeleteSong({ record, messageApi }) {
   const dispatch = useDispatch();

  const handleDelete = async () => {
    const response = await deleteSong(record._id);

    if (response.code === 200) {
      messageApi.success({
        content: 'Xoá bài hát thành công',
        duration: 5,
      });
      dispatch(deleteSongAction(response))
    } else {
      messageApi.error({
        content: 'Xoá bài hát chưa thành công',
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

export default DeleteSong;