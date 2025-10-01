/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getListSong } from "../../../services/admin/songService";
import SongTable from "./SongTable";
import "./Song.scss";
import { useDispatch, useSelector } from "react-redux";
import { getListSongsAction } from "../../../actions/admin/songs.actions";
import { getListTopic } from "../../../services/admin/topicsService";
import { getListTopicsAction } from "../../../actions/admin/topics.actions";
import { getListSinger } from "../../../services/admin/singerService";
import { getListSingersAction } from "../../../actions/admin/singers.actions";

function ListSong() {
  const dispatch = useDispatch();
  const { filter, keyword } = useSelector((state) => state.admin.songs);

  const fetchData = async () => {
    try {
      const [songRes, topicRes, singerRes] = await Promise.all([
        getListSong(filter, keyword),
        getListTopic(),
        getListSinger()
      ]);

      dispatch(getListSongsAction(songRes));
      dispatch(getListTopicsAction(topicRes));
      dispatch(getListSingersAction(singerRes));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, keyword]);

  return (
    <>
      <SongTable />
    </>
  )
}

export default ListSong;