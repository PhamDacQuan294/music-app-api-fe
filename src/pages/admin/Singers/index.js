/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { getListSinger } from "../../../services/admin/singerService";
import SingerTable from "./SingerTable";
import { getListSingersAction } from "../../../actions/admin/singers.actions";
import { useEffect } from "react";

function ListSinger() {
  const dispatch = useDispatch();
  const { filter, keyword } = useSelector((state) => state.admin.singers);

  const fetchData = async () => {
    try {
      const singerRes = await getListSinger(filter, keyword);

      dispatch(getListSingersAction(singerRes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, keyword])
  
  return (
    <>
      <SingerTable />
    </>
  )
} 

export default ListSinger;