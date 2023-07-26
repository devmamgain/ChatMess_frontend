import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { UPDATE_USER } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

function ProfileUpdateForm({ onClose }) {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState(userInfo?.about || "");
  const [image, setImage] = useState(userInfo?.profileImage || "/default_avatar.png");

  const updateProfileHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(UPDATE_USER, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          const updatedUserInfo = {
            ...userInfo,
            name,
            status: about,
            profileImage: image,
          };
          dispatch({ type: reducerCases.SET_USER_INFO, userInfo: updatedUserInfo });
          onClose(); 
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl">Update your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
              onClick={updateProfileHandler}
            >
              Update Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdateForm;
