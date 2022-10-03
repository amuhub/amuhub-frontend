import "./News.css";

const News = () => {
  return (
    <div className="event-component">
      <h1 className="upcoming-event">Upcoming Event</h1>
      <div className="event-component-header">
        <h1 className="event-title">
          Workshop "Getting Started with Web Development" to get you started
          with web developemnt delevered by best instructor of AMU, Hasan Faraz
        </h1>
        <h1 className="start-event">
          13 <span>mon</span>
        </h1>
      </div>
      <div className="event-details">
        <p className="event-detail-header">Details</p>
        <p className="details">
          Start :<span className="detail-value">13:07 - 01 - 02- 2022</span>
        </p>
        <p className="details">
          End :<span className="detail-value">12:00 - 15 - 10- 2022</span>
        </p>
        <p className="details">
          Venue :<span className="detail-value">13:07 - 01 - 02- 2022</span>
        </p>
      </div>
    </div>
  );
};

export default News;
