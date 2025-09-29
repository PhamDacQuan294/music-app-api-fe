/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { message } from "antd";
import { getListSong } from "../../../services/admin/songService";
import { getListTopic } from "../../../services/admin/topicsService";
import { getListSinger } from "../../../services/admin/singerService";
import SongTable from "./SongTable";
import "./Song.scss";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSongsAction } from "../../../actions/admin/songs.actions";
export const SongContext = createContext();

function ListSong() {
  const dispatch = useDispatch();
  const [topics, setTopics] = useState([]);
  const [singers, setSingers] = useState([]);
 
  const { filter, keyword } = useSelector((state) => state.admin.songs);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async () => {
    try {
      const [songRes, topicRes, singerRes] = await Promise.all([
        getListSong(filter, keyword),
        getListTopic(),
        getListSinger(),
      ]);

      setTopics(topicRes?.topics || []);
      setSingers(singerRes || []);

      dispatch(getListSongsAction(songRes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, keyword]);

  return (
    <>
      {contextHolder}
      <SongContext.Provider
        value={{
          topics,
          singers,
          messageApi,
        }}
      >
        <SongTable />
      </SongContext.Provider>
    </>
  )
}

export default ListSong;