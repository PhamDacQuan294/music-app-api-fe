import { useEffect } from "react";
import TopicTable from "./TopicTable";
import { getListTopic } from "../../../services/admin/topicsService";
import { useDispatch, useSelector } from "react-redux";
import { getListTopics } from "../../../actions/admin/topics.actions";

function ListTopic() {
  const dispatch = useDispatch();
  const topics = useSelector((state) => state.admin.topics);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getListTopic();
      dispatch(getListTopics(data.topics));
    };
    fetchTopics();
  }, [dispatch]);
  
  return (
    <>
      <TopicTable topics={topics}/>
    </>
  )
}

export default ListTopic;