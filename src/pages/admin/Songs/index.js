import { useEffect, useState } from "react";
import { getListSong } from "../../../services/admin/songService";
import SongTable from "./SongTable";

function ListSong() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState();

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getListSong();
      setData(data.songs);
    }


    fetchSongs();
  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <SongTable songs={data} onReload={handleReload }/>
    </>
  )
}

export default ListSong;