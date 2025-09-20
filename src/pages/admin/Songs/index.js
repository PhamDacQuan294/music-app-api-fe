import { useEffect, useState } from "react";
import { getListSong } from "../../../services/admin/songService";
import SongTable from "./SongTable";
import { getListTopic } from "../../../services/admin/topicsService";
import { getListSinger } from "../../../services/admin/singerService";

function ListSong() {
  const [data, setData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [singers, setSingers] = useState([]);
  const [reload, setReload] = useState();

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getListSong();
      setData(data.songs);
    }
    
    fetchSongs();

    const fetchTopics = async () => {
      const data = await getListTopic();
      setTopics(data.topics);
    }

    fetchTopics();

    const fetchSinger = async () => {
      const data = await getListSinger();
      setSingers(data);
    }

    fetchSinger();

  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <SongTable songs={data} topics={topics} singers={singers} onReload={handleReload }/>
    </>
  )
}

export default ListSong;