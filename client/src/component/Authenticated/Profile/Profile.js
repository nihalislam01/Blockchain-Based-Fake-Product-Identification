import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Profile.scss";

import Avatar from "./Avatar/Avatar";
import Info from "./Info/Info";
import History from "./History";

import CommonHelmet from "../../../common/components/Head/CommonHelmet";
import handleAxiosError from "../../../common/utils/ErrorHandler";

const getUserUrl = "/api/user/get";

const pageTitle = "Hexis - Profile";

const Profile = () => {

    const [user, setUser] = useState({});
    const [editableUser, setEditableUser] = useState({});
    const [dob, setDob] = useState(null);
    const [avatar, setAvatar] = useState("/avatar/avatar.png");

    useEffect(()=>{
        const getUser = async () =>{
            await axios.get(getUserUrl)
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
        }
        getUser();
    },[])

    const formatdate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }


    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="d-flex gap-4 container">
                <div className={`infoContainer`}>
                    <Avatar avatar={avatar} />
                    <Info user={user} dob={dob} editableUser={editableUser} setEditableUser={setEditableUser} setUser={setUser}/>
                </div>
                <div style={{width: "65%"}}>
                    <History />
                </div>
            </div>
        </>
    );
};

export default Profile;
