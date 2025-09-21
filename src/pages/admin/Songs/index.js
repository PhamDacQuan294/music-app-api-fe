import { useEffect, useState } from "react";
import { message } from "antd";  
import { getListSong } from "../../../services/admin/songService";
import { getListTopic } from "../../../services/admin/topicsService";
import { getListSinger } from "../../../services/admin/singerService";
import SongTable from "./SongTable";

function ListSong() {
  const [songs, setSongs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [singers, setSingers] = useState([]);
  const [reload, setReload] = useState();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songRes, topicRes, singerRes] = await Promise.all([
          getListSong(),
          getListTopic(),
          getListSinger(),
        ]);

        setSongs(songRes?.songs || []);
        setTopics(topicRes?.topics || []);
        setSingers(singerRes || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      {contextHolder}
      <SongTable 
        songs={songs} 
        topics={topics} 
        singers={singers} 
        onReload={handleReload} 
        messageApi={messageApi}  
      />
    </>
  )
}

export default ListSong;