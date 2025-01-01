import React from "react";
import styles from "./Avatar.module.scss";
import axios from "axios";
import {toast} from "react-hot-toast";
import handleAxiosError from "../../../../common/utils/ErrorHandler";

const uploadAvatarUrl = "/api/user/uploadAvatar";

const Avatar = ({ avatar }) => {
  
    const handleUpload = async (file) => {

        if (!file) return;
    
        const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        const base64Image = await toBase64(file);

        toast.promise(
          axios.put(
              uploadAvatarUrl,
              { avatar: base64Image },
              { headers: { "Content-Type": "application/json" } }
          ),
          {
              loading: "Updating image...",
              success: (response) =>  response.data.message,
              error: (err) => {
                  handleAxiosError(err);
              },
          });
      
      };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };

  return (
    <div className={styles.imageContainer}>
      <img src={avatar} alt="Profile" className={styles.image} />
      <div className={styles.overlay}>
        <label className={styles.editButton}>
          <i className="fa-solid fa-pen-to-square fa-2xl"></i>
          <input type="file" accept="image/*" onChange={handleFileChange} className={styles.fileInput}/>
        </label>
      </div>
    </div>
  );
};

export default Avatar;
