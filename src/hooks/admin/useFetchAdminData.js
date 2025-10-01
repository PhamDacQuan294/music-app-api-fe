import { getListTopic } from "../../services/admin/topicsService";
import { getListSinger } from "../../services/admin/singerService";
import { getListTopicsAction } from "../../actions/admin/topics.actions";
import { getListSingersAction } from "../../actions/admin/singers.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getListSong } from "../../services/admin/songService";
import { getListSongsAction } from "../../actions/admin/songs.actions";

const useFetchAdminData = (filter, keyword) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songRes, topicRes, singerRes] = await Promise.all([
          getListSong(filter, keyword),
          getListTopic(),
          getListSinger()
        ]);

        dispatch(getListSongsAction(songRes));
        dispatch(getListTopicsAction(topicRes));
        dispatch(getListSingersAction(singerRes));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, filter, keyword]);
};

export default useFetchAdminData;
