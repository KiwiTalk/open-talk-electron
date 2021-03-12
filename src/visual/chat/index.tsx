/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React from 'react';
import { ChannelUserInfo, Chat, Chatlog, KnownChatType, TalkChannel } from "node-kakao";
import { TextChatComponent } from './text';

export enum UserPosition {
  LEFT,
  RIGHT
}

export type ChatComponentProp = {
  direction: UserPosition,
  chat: Chat
}

export const ChatComponent: React.FC<ChatComponentProp> = (prop) => {
  switch (prop.chat.type) {
    case KnownChatType.TEXT: return <TextChatComponent {...prop} />;

    default: return <UnknownChatComponent {...prop} />;
  }
}

export const UnknownChatComponent: React.FC<ChatComponentProp> = (prop) => {
  return <p>지원하지 않는 타입입니다. type: {prop.chat.type}</p>;
}

export type UserChatComponentProp = ChatComponentProp & {
  userInfo: ChannelUserInfo
}

export const UserChatComponent: React.FC<UserChatComponentProp> = (prop) => {
  const chatComponent = <ChatComponent chat={prop.chat} direction={prop.direction} />;
  const userComponent = <p>{prop.userInfo.nickname} -&gt; </p>;
  return <div>
    {prop.direction === UserPosition.LEFT ? [userComponent, chatComponent] : [chatComponent, userComponent]}
  </div>;
}

export type ChatlogComponentProp = UserChatComponentProp & {
  channel: TalkChannel,
  chat: Chatlog
};

export const ChatlogComponent: React.FC<ChatlogComponentProp> = (prop) => {
  return <div>
    <UserChatComponent chat={prop.chat} direction={prop.direction} userInfo={prop.userInfo} />
    <span>{prop.channel.userCount - prop.channel.getReadCount(prop.chat)}</span>
  </div>;
}