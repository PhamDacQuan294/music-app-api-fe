import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSong } from "../../../services/admin/songService";

function DeleteSong(props) {
  const { record, onReload } = props;

  const handleDelete = async () => {
    const response = await deleteSong(record._id);

    if (response) {
      onReload();
      alert("Xoá bài hát thành công");
      onReload();
    } else {
      alert("Xoá bài hát chưa thành công");
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