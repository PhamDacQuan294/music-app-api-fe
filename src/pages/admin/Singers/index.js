import { useDispatch } from "react-redux";
import { getListSinger } from "../../../services/admin/singerService";
import SingerTable from "./SingerTable";
import { getListSingersAction } from "../../../actions/admin/singers.actions";
import { useEffect } from "react";

function ListSinger() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const singerRes = await getListSinger();

      dispatch(getListSingersAction(singerRes));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  })
  
  return (
    <>
      <SingerTable />
    </>
  )
} 

export default ListSinger;