import { useEffect, useState } from "react";
import TopicTable from "./TopicTable";
import { getListTopic } from "../../../services/admin/topicsService";

function ListTopic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getListTopic();
      setData(data.topics);
    }
    fetchTopics();
  }, [])
  
  return (
    <>
      <TopicTable topics={data}/>
    </>
  )
}

export default ListTopic;