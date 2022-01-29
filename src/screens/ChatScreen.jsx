import React, { useState } from "react";
import { ChannelListContainer, ChannelContainer, Auth } from "../components";
import { Chat } from "stream-chat-react";

import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

import "stream-chat-react/dist/css/index.css";

export default function ChatScreen() {
  const apiKey = "vmqupdngewz4";
  const client = StreamChat.getInstance(apiKey);

  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo } = adminSignin;

  if (adminInfo) {
    console.log("entro");
    client.connectUser(
      {
        username: adminInfo.username,
        fullName: adminInfo.name,
        id: adminInfo.userId,
        phoneNumber: adminInfo.phone,
      },
      adminInfo.token
    );
  }

  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}
