/* eslint-disable react-hooks/exhaustive-deps */
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
  const [filterStatus, setFilterStatus] = useState([]);
  const [pagination, setPagination] = useState({});
  const [status, setStatus] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortValue, setSortValue] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (status = "", key = sortKey, value = sortValue, page = pagination.currentPage || 1, pageSize = pagination.limitItems || 2) => {
    try {
      const [songRes, topicRes, singerRes] = await Promise.all([
        getListSong(status, key, value, page, pageSize),
        getListTopic(),
        getListSinger(),
      ]);

      setSongs(songRes?.songs || []);
      setFilterStatus(songRes?.filterStatus || []);
      setPagination(songRes?.pagination || "");
      setTopics(topicRes?.topics || []);
      setSingers(singerRes || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(status, sortKey, sortValue);
  }, [status, sortKey, sortValue]);

  const handleSearchResult = (newSongs) => {
    setSongs(newSongs);
  }

  const handleSort = (sortKey, sortValue) => {
    setSortKey(sortKey);
    setSortValue(sortValue);
  }

  const handlePaginationChange = ({ page, pageSize }) => {
    fetchData(status, sortKey, sortValue, page, pageSize);
  };

  return (
    <>
      {contextHolder}
      <SongContext.Provider
        value={{
          songs,
          filterStatus,
          topics,
          singers,
          pagination,
          onReload: (page = pagination.currentPage) =>
            fetchData(status, sortKey, sortValue, page, pagination.limitItems),
          onFilterChange: setStatus,
          onSearchResult: handleSearchResult,
          onSort: handleSort,
          onPaginationChange: handlePaginationChange,
          messageApi,
        }}
      >
        <SongTable />
      </SongContext.Provider>
    </>
  )
}

export default ListSong;