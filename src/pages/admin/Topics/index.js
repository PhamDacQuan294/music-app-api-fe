/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import TopicTable from "./TopicTable";
import { getListTopic } from "../../../services/admin/topicsService";
import { useDispatch, useSelector } from "react-redux";
import { getListTopicsAction} from "../../../actions/admin/topics.actions";

function ListTopic() {
  const dispatch = useDispatch();
  const { filter, keyword } = useSelector((state) => state.admin.topics);

  const fetchData = async () => {
    try {
      const [topicRes] = await Promise.all([
        getListTopic(filter, keyword)
      ]);

      dispatch(getListTopicsAction(topicRes));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, keyword])
  
  return (
    <>
      <TopicTable />
    </>
  )
}

export default ListTopic;