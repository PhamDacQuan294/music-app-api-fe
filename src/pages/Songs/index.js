/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getListSong } from "../../services/songService";
import { useParams } from "react-router-dom";
import SongList from "./SongList";
import "./Song.scss";

function Songs() {
  const [data, setData] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getListSong(params.slugTopic);
      setData(data);
    }
    fetchSongs();
  }, []);

  console.log(data);

  return (
    <>
      <SongList songs={data.songs} />
    </>
  )
}

export default Songs;