/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getListSong } from "../../../services/admin/songService";
import SongTable from "./SongTable";
import "./Song.scss";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListSongsAction } from "../../../actions/admin/songs.actions";
export const SongContext = createContext();

function ListSong() {
  const dispatch = useDispatch();
  const { filterSong, keyword } = useSelector((state) => state.admin.songs);

  const fetchData = async () => {
    try {
      const [songRes] = await Promise.all([
        getListSong(filterSong, keyword),
      ]);

      dispatch(getListSongsAction(songRes));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterSong, keyword]);

  return (
    <>
      <SongTable />
    </>
  )
}

export default ListSong;