import { useEffect, useRef } from "react";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";

function AudioPlayer({ song, singer }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (!song || !singer) return;

    const ap = new APlayer({
      container: playerRef.current,
      audio: [
        {
          name: song.title,
          artist: singer.fullName,
          url: song.audio,
          cover: song.avatar,
        },
      ],
      autoplay: true,
      volume: 0.8,
    });

    // cleanup khi component bị unmount
    return () => {
      ap.destroy(); //Cleanup ap.destroy() để tránh lỗi khi chuyển trang.
    };
  }, [song, singer]);

  return <div id="aplayer" ref={playerRef}></div>;
}

export default AudioPlayer;
