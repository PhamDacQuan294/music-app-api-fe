import { useEffect, useRef } from "react";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import { updateListen } from "../../../services/client/songService";

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

    const avatar = document.querySelector(".detail-song__avatar");

    ap.on('play', function () {
      avatar.style.animationPlayState = "running";
    });

    ap.on('pause', function () {
      avatar.style.animationPlayState = "paused";
    });

    ap.on('ended', async function() {
      const data = await updateListen(`${song._id}`);
      if (data) {
        const elementListen = document.querySelector(".detail-song__action--listen span");
        elementListen.innerHTML = `${data.listen} lượt nghe`
      }
    });

    // cleanup khi component bị unmount
    return () => {
      ap.destroy(); //Cleanup ap.destroy() để tránh lỗi khi chuyển trang.
    };
  }, [song, singer]);

  return <div id="aplayer" ref={playerRef}></div>;
}

export default AudioPlayer;
