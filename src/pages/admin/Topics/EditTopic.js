import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

function EditTopic(props) {
  return (
    <>
      <Button size="small" type="primary" icon={<EditOutlined />}/>
    </>
  )
}

export default EditTopic;