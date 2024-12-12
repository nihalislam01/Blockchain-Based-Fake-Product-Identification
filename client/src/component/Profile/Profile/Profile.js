import React, { useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./Profile.module.scss";
import axios from "axios";
import handleAxiosError from "../../../common/utils/ErrorHandler";
import Info from "../Info/Info";
import CommonHelmet from "../../../common/components/Head/CommonHelmet";
const getUserUrl = "/api/user/get";
const pageTitle = "Hexis - Profile";

const Profile = () => {

    const [user, setUser] = useState({});
    const [editableUser, setEditableUser] = useState({});
    const [dob, setDob] = useState(null);
    const [avatar, setAvatar] = useState("/avatar/avatar.png");

    useEffect(()=>{
        axios.get(getUserUrl)
        .then((response) => {
            setUser(response.data.user);
            setEditableUser(response.data.user);
            if (response.data.user.avatar) {
                setAvatar(response.data.user.avatar.url);
            }
            if (response.data.user.dateOfBirth!==null) {
                setDob(formatdate(response.data.user.dateOfBirth));
            }
        }).catch(handleAxiosError);
    },[])

    const formatdate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }


    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <div className={styles.infoContainer}>
                    <Avatar avatar={avatar} />
                    <Info user={user} dob={dob} editableUser={editableUser} setEditableUser={setEditableUser} setUser={setUser}/>
                </div>
            </div>
        </>
    );
};

export default Profile;
