import { useEffect, useState } from "react";
import { getListTopic } from "../../../services/topicsService";
import TopicList from "./TopicList";
import "./Topic.scss";

function Topics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getListTopic();
      setData(data);
    }

    fetchTopics();
  }, []);

  return (
    <>
      <TopicList topics={data} />
    </>
  )
}

export default Topics;