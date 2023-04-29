import { fetchDate, convertDate } from "../../utils/parseDate";
// import fetchDate from '../../utils/fetchDate';
import "./News.css";

const News = (props) => {
  const { data } = props;
  const { day_num, day } = fetchDate(data.date);
  console.log(`Date : ${day_num} and ${day}`);
  return (
    <div className="event-component">
      <h1 className="upcoming-event">AMU News</h1>
      <div className="event-component-header">
        <h1 className="event-title">{data.title}</h1>
        <h1 className="start-event">
          {day_num} <span>{day}</span>
        </h1>
      </div>
      <div className="event-details">
        {/* <p className="event-detail-header">Details</p> */}
        <p className="details">
          Date :
          <span className="detail-value">{data.date}</span>
        </p>
      </div>
    </div>
  );
};

export default News;
