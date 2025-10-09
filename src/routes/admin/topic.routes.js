import ListTopic from "../../pages/admin/Topics/";
import CreateTopic from "../../pages/admin/Topics/CreateTopic";

export const topicRoutes = [
  {
    path: "topics",
    element: <ListTopic />
  },
  {
    path: "create-topic",
    element: <CreateTopic />
  }
];
