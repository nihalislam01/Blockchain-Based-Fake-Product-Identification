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
    const [name, setName] = useState(user.name);
    const [avatar, setAvatar] = useState("/avatar/avatar.png");

    useEffect(()=>{
        axios.get(getUserUrl)
        .then((response) => {
            setUser(response.data.user);
            setName(response.data.user.name);
            if (response.data.user.avatar) {
                setAvatar(response.data.user.avatar.url);
            }
        }).catch(handleAxiosError);
    },[])


    return (
        <>
            <CommonHelmet title={pageTitle} />
            <div className="container">
                <div className={styles.infoContainer}>
                    <Avatar avatar={avatar} />
                    <Info email={user.email} name={name} setName={setName}/>
                </div>
            </div>
        </>
    );
};

export default Profile;
