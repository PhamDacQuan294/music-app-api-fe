import moment from "moment";

const FormatDate = ({ time, type = "date" }) => {
  if (!time) return <>—</>;

  switch (type) {
    case "datetime":
      return <span>{moment(time).format("DD/MM/YYYY HH:mm:ss")}</span>;
    case "time":
      return <span>{moment(time).format("HH:mm:ss")}</span>;
    default:
      return <span>{moment(time).format("DD/MM/YYYY")}</span>;
  }
};

export default FormatDate;
