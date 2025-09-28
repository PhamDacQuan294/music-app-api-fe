// components/admin/PaginationConfig.js
export const getPaginationConfig = (pagination, onPaginationChange) => ({
  current: pagination.currentPage,
  pageSize: pagination.limitItems,
  total: pagination.totalPage * pagination.limitItems,
  onChange: (page, pageSize) => {
    onPaginationChange({ page, pageSize });
  },
  showSizeChanger: false,
});
