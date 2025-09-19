import ListSong from "../../pages/admin/Songs";
import CreateSong from "../../pages/admin/Songs/CreateSong";

export const songRoutes = [
  {
    path: "songs",
    element: <ListSong />
  },
  {
    path: "create-song",
    element: <CreateSong />
  }
];
