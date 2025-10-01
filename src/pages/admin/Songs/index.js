/* eslint-disable react-hooks/exhaustive-deps */
import SongTable from "./SongTable";
import "./Song.scss";
import { useSelector } from "react-redux";
import useFetchAdminData from "../../../hooks/admin/useFetchAdminData";

function ListSong() {
  const { filter, keyword } = useSelector((state) => state.admin.songs);
  useFetchAdminData(filter, keyword);

  return (
    <>
      <SongTable />
    </>
  )
}

export default ListSong;