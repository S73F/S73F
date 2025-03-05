import React from "react";
import "../../css/notification.css";

const notificationLayout = ({ children }) => {
    return <button id="notification-layout">{children}</button>;
};

const lavoriNuoviNotification = ({ lavoriNuovi, onClick }) => {
    return (
        <div id="lavori-nuovi-btn" onClick={onClick}>
            {lavoriNuovi}
        </div>
    );
};

const Notification = {
    Layout: notificationLayout,
    LavoriNuovi: lavoriNuoviNotification,
};

export default Notification;
