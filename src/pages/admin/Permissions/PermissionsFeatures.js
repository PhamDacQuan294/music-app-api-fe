import { useMemo } from "react";

export const useFeaturesData = () => {
  return useMemo( () => 
    [
      {
        group: "Quản lý chủ đề",
        actions: [
          "topics_view", 
          "topics_create", 
          "topics_edit", 
          "topics_delete"
        ],
        labels: ["Xem", "Thêm mới", "Chỉnh sửa", "Xoá"],
      },
      {
        group: "Quản lý bài hát",
        actions: [
          "songs_view", 
          "songs_create", 
          "songs_edit", 
          "songs_delete"
        ],
        labels: ["Xem", "Thêm mới", "Chỉnh sửa", "Xoá"],
      },
      {
        group: "Nhóm quyền",
        actions: [
          "roles_view",
          "roles_create",
          "roles_edit",
          "roles_delete",
          "roles_permissions",
        ],
        labels: ["Xem", "Thêm mới", "Chỉnh sửa", "Xoá", "Phân quyền"],
      },
    ], 
    [] 
  );
};
