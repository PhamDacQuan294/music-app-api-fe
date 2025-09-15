import Songs from "../../pages/Songs";
import DetailSong from "../../pages/Songs/DetailSong";

export const songRoutes = [
  {
    path: "songs/:slugTopic",
    element: <Songs />
  },
  {
    path: "songs/detail/:slugSong",
    element: <DetailSong />
  }
];
