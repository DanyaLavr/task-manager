import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./notification.module.css";
import { removeNotification } from "redux/notification/notificationSlice";
import { useEffect } from "react";
const Notification = ({ notification }) => {
  const dispatch = useDispatch();
  const { id, message, type } = notification;
  useEffect(() => {
    setTimeout(() => dispatch(removeNotification(id)), 5000);
  }, []);
  return createPortal(
    <div
      key={id}
      className={`${css.notification} ${
        type === "success"
          ? css.success
          : type === "error"
          ? css.notification
          : ""
      }`}
    >
      <div className={css.content}>
        <span className={css.message}>{message}</span>
        <button
          onClick={() => dispatch(removeNotification(id))}
          className={css.closeButton}
        >
          ×
        </button>
      </div>
    </div>,
    document.getElementById("notification-root")
  );
};

// export default Notification;

const NotificationContainer = () => {
  const notifications = useSelector(
    state => state.notification.listOfNotifications
  );
  return (
    <>
      {notifications.map(elem => (
        <Notification key={elem.id} notification={elem} />
      ))}
    </>
  );
};

export default NotificationContainer;
