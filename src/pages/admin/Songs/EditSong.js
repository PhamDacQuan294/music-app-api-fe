import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

function EditSong(props) {
  return (
    <>
      <Button size="small" type="primary" icon={<EditOutlined />}/>
    </>
  )
}

export default EditSong;