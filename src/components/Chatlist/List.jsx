import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatLIstItem from "./ChatLIstItem";
import SearchBar from "./SearchBar";

function List({ socket }) {
  const [{userInfo,userContacts,filteredContacts},dispatch] = useStateProvider()
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const handleNewChat = (newChat) => {
    dispatch({ type: reducerCases.SET_USER_CONTACTS, userContacts: [...userContacts, newChat] });
  };
  useEffect(()=>{
const getContacts = async()=>{
  try{
     const{ data : {users,onlineUsers} }
     = await axios (`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`)
         dispatch ({type:reducerCases.SET_ONLINE_USERS,onlineUsers})
         dispatch({type:reducerCases.SET_USER_CONTACTS,userContacts: users})
    }catch(err){
     console.log(err)
  }
}
getContacts()
if (socket) {
  // Use the existing Socket.IO connection received as a prop
  socket.on("online-users", ({ onlineUsers }) => {
    // Update the online users in the state when the server sends the updated list
    dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
  });

  socket.on("msg-recieve", (data) => {
    // Handle new messages received from the server
    handleNewChat(data.message);
  });
}

  }, [userInfo, userContacts, filteredContacts, socket])

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setIsSearchActive(searchTerm.trim() !== "");
  };

  const filteredContactsToRender = isSearchActive
    ? userContacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      )
    : userContacts;

  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full custom-scrollbar">
      <SearchBar handleSearch={handleSearch} />
      {filteredContactsToRender.length === 0 && isSearchActive ? (
        <div className="text-white text-center mt-4">No results found</div>
      ) : (
        filteredContactsToRender.map((contact) => <ChatLIstItem data={contact} key={contact.id} />)
      )}
    </div>
  );
}


export default List;
