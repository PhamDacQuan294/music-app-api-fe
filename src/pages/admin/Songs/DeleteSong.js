import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteSong } from "../../../services/admin/songService";
import { SongContext } from "./index";
import { useContext } from "react";

function DeleteSong(props) {
  const  songContexts = useContext(SongContext);

  const { record } = props;

  const handleDelete = async () => {
    const response = await deleteSong(record._id);

    if (response) {
      songContexts.messageApi.open({
        type: 'success',
        content: 'Xoá bài hát thành công',
        duration: 5,
      });
      songContexts.onReload();
    } else {
      songContexts.messageApi.open({
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