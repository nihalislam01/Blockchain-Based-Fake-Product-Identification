import {useEffect, useState} from "react";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import axios from "axios";
import "./Notification.scss";
import FormatDate from "../../../common/utils/FormatDate";
import toast from "react-hot-toast";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";

const getNotificationsUrl = '/api/notification/get';
const deleteNotificationsUrl = '/api/notification/delete';

function Notification() {

    const [notifications, setNotifications] = useState([]);

    useEffect(()=>{
        axios.get(getNotificationsUrl)
        .then(response=>setNotifications(response.data.notifications))
        .catch(handleAxiosError)
    },[])

    const deleteNotification = (id) => {
        axios.delete(`${deleteNotificationsUrl}/${id}`)
       .then(response=>toast.success(response.data.message))
       .catch(handleAxiosError)
    }
    return (
        <>
        <CommonHelmet title="Hexis - Notifications" />
        <div className="container d-flex justify-content-center">
            <div className="notification-container">
                <h2>Notifications</h2>
                <hr />
                {notifications.length<=0 && <p style={{fontSize: "15px", margin: "0", textAlign: "center", fontWeight: "bold"}}>No notification yet</p>}
                {notifications.map(notification=>(
                    <div className="notification-box border shadow">
                        <div className="d-flex justify-content-between">
                            <p className="notification-headline">{notification.title}</p>
                            <button style={{background: "none", border: "none", fontSize: "20px"}} onClick={() => deleteNotification(notification._id)}><i className="fa-regular fa-circle-xmark fa-xs"></i></button>
                        </div>
                        <p className="m-0" style={{textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{notification.description}</p>
                        <p className="m-0" style={{fontSize: "12px"}}>{FormatDate(notification.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default Notification;