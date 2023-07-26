import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";
import ProfileUpdateForm from "@/components/common/ProfileUpdateForm"; 
import ContextMenu from "../common/ContextMenu";
import { useRouter } from "next/router";

function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const router = useRouter()
  const[isContextMenuVisible, setIsContextMenuVisible] = useState(false)
  const [contextMenuCordinates, setcontextMenuCordinates] = useState({
    x:0,
    y:0,
  })
  const showContextMenu =(e) => {
    e.preventDefault();
    setIsContextMenuVisible(true);
    setcontextMenuCordinates({x: e.pageX - 50, y: e.pageY + 20});
  }
  
  const contextMenuOptions =[{
    name:"Logout",
    callback: async () => {
       setIsContextMenuVisible(false)
       router.push("/logout")
    }
  }]
  const [showUpdateComponent, setShowUpdateComponent] = useState(false);

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  const toggleUpdateComponent = () => {
    dispatch({type: reducerCases.SET_EXIT_CHAT})

    setShowUpdateComponent((prevValue) => !prevValue);
  };
  const handleFormClose = () => {
    setShowUpdateComponent(false);
  };

  return (
    <div className="chat-list-header-container">
      <div className="h-16 px-4 py-3 flex justify-between items-center">
        <button onClick={toggleUpdateComponent}>
          <div className="cursor-pointer">
            <Avatar type="sm" image={userInfo?.profileImage} />
          </div>
        </button>
        <div className="flex gap-6">
          {!showUpdateComponent && (
            <>
              <BsFillChatLeftTextFill
                className="text-panel-header-icon cursor-pointer text-x1"
                title="New Chat"
                onClick={handleAllContactsPage}
              />
              <BsThreeDotsVertical
                className="text-panel-header-icon cursor-pointer text-x1"
                title="Menu"
                onClick={(e) => showContextMenu(e)}
                id="context-opener"
              />
              {
            isContextMenuVisible && (
            <ContextMenu
            options={contextMenuOptions}
            cordinates={contextMenuCordinates}
            contextMenu={isContextMenuVisible}
            setContextMenu={setIsContextMenuVisible}
            />
          )
        }
            </>
          )}
        </div>
      </div>
      {showUpdateComponent && (
        <div className="profile-update-container">
          <ProfileUpdateForm
            name={userInfo?.name}
            profileImage={userInfo?.profileImage}
            about={userInfo?.status}
            onClose={handleFormClose}
          />
        </div>
      )}
    </div>
  );
}

export default ChatListHeader;
