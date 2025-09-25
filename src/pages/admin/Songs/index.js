import { useEffect, useState } from "react";
import { message } from "antd";  
import { getListSong } from "../../../services/admin/songService";
import { getListTopic } from "../../../services/admin/topicsService";
import { getListSinger } from "../../../services/admin/singerService";
import SongTable from "./SongTable";
import "./Song.scss";
import { createContext } from "react";
export const SongContext = createContext();

function ListSong() {
  const [songs, setSongs] = useState([]);
  const [topics, setTopics] = useState([]);
  const [singers, setSingers] = useState([]);
  const [filterStatus, setFilterStatus]= useState([]);
  const [status, setStatus] = useState(""); 

  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (status = "") => {
    try {
      const [songRes, topicRes, singerRes] = await Promise.all([
        getListSong(status), 
        getListTopic(),
        getListSinger(),
      ]);

      setSongs(songRes?.songs || []);
      setFilterStatus(songRes?.filterStatus || []);
      setTopics(topicRes?.topics || []);
      setSingers(singerRes || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(status);
  }, [status]);

  const handleSearchResult = (newSongs) => {
    setSongs(newSongs);
  }

  return (
    <>
      {contextHolder}
      <SongContext.Provider
        value={{
          songs,
          filterStatus,
          topics,
          singers,
          onReload: () => fetchData(status),
          onFilterChange: setStatus,
          onSearchResult: handleSearchResult,
          messageApi,
        }}
      >
        <SongTable />
      </SongContext.Provider>
    </>
  )
}

export default ListSong;