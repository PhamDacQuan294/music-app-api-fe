import Songs from "../../pages/client/Songs";
import DetailSong from "../../pages/client/Songs/DetailSong";

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
    path: "songs/like/:typeLike/:idSong",
    element: <DetailSong />
  }
];
