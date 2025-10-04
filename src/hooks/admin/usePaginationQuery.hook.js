import { useSearchParams } from "react-router-dom";

function usePaginationQuery(defaultPage = 1) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || defaultPage, 10);

  const setPage = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return [page, setPage];
}

export default usePaginationQuery;