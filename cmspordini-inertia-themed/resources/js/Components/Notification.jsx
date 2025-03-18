import React from "react";
import "../../css/notification.css";

const notificationLayout = ({ children }) => {
    return <button id="notification-layout">{children}</button>;
};

const lavoriNuoviNotification = ({ lavoriNuovi, onClick, loading }) => {
    return (
        <div id="lavori-nuovi-btn" onClick={onClick}>
            {loading && <div id="lavori-spinner" />}
            {!loading && lavoriNuovi}
        </div>
    );
};

const Notification = {
    Layout: notificationLayout,
    LavoriNuovi: lavoriNuoviNotification,
};

export default Notification;
