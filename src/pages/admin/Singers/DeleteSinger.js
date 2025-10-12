import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteSinger() {
  return (
    <>
      <Popconfirm title="Sure to delete?">
        <Button danger size="small" icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  )
}

export default DeleteSinger;