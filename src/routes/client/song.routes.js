import Songs from "../../pages/client/Songs";
import DetailSong from "../../pages/client/Songs/DetailSong";
import FavoriteSong from "../../pages/client/Songs/FavoriteSong";

export const songRoutes = [
  {
    path: "songs/:slugTopic",
    element: <Songs />
  },
  {
    path: "songs/detail/:slugSong",
    element: <DetailSong />
  }, 
  {
    path: "favorite-songs",
    element: <FavoriteSong />
  }
];
