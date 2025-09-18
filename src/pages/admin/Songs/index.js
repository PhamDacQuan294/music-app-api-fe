import { useEffect, useState } from "react";
import { getListSong } from "../../../services/admin/songService";
import SongTable from "./SongTable";

function ListSong() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getListSong();
      setData(data.songs);
    }
    fetchSongs();
  }, []);

  return (
    <>
      <SongTable songs={data}/>
    </>
  )
}

export default ListSong;