import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSong } from "../../../services/admin/songService";

function DeleteSong(props) {
  const { record, onReload, messageApi} = props;

  const handleDelete = async () => {
    const response = await deleteSong(record._id);

    if (response) {
      messageApi.open({
        type: 'success',
        content: 'Xoá bài hát thành công',
        duration: 5,
      });
      onReload();
    } else {
      messageApi.open({
        type: 'error',
        content: 'Xoá bài hát chưa thành công',
        duration: 5,
      });
    }
  }

  return (
    <>
      <Popconfirm title="Sure to delete?" onConfirm={handleDelete}>
        <Button danger size="small" icon={<DeleteOutlined />}/>
      </Popconfirm>
    </>
  )
}

export default DeleteSong;