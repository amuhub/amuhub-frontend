import React from "react";
import "./Notification.css";
import moment from "moment";
import baseUrl from "../../utils/constants";
import axios from "axios";

const Notification = ({ data }) => {
  const token = localStorage.getItem("token");

  const notificationClick = async () => {
    try {
      const res = await axios.get(`${baseUrl}/notification/view/${data.id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.href = `/${data.redirectUrl}`;
    }
  };
  return (
    <>
      <div className="notification-body" onClick={notificationClick}>
        <div
          className={`read-indicator ${
            data.isViewed ? "indicator-hidden" : ""
          }`}
        ></div>
        <div className="notification-content">
          <p className="notification-text">{data.message}</p>
          <p className="notificaion-timestamp">
            {moment(data.createdAt).fromNow()}
          </p>
        </div>
        <div className="notification-img">
          <img src={data.sender.profile.pic} alt="user" />
        </div>
      </div>
      <div className="notification-divider"></div>
    </>
  );
};

export default Notification;
