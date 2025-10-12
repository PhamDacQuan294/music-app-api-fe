import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { deleteTopicAction } from "../../../actions/admin/topics.actions";
import { deleteTopic } from "../../../services/admin/topicsService";

function DeleteTopic({ record, messageApi }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const response = await deleteTopic(record._id);

    if (response.code === 200) {
      messageApi.success({
        content: 'Xoá bài hát thành công',
        duration: 5,
      });
      dispatch(deleteTopicAction(response))
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

export default DeleteTopic;