/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { Chat, ChatType, KnownChatType, TalkChannel, TalkNormalChannel, TalkOpenChannel } from 'node-kakao';
import React, { createRef } from 'react';
import { ChatInputForm } from './form';

export type NormalChatInputProp = {
  channel: TalkNormalChannel
}

export const NormalChatInput: React.FC<NormalChatInputProp> = (prop) => {
  return <div>
    <TextChatInput channel={prop.channel} />
    <div>
      <p>사진 전송</p>
      <MediaChatInput channel={prop.channel} type={KnownChatType.PHOTO}/>
    </div>
    <div>
      <p>파일 전송</p>
      <MediaChatInput channel={prop.channel} type={KnownChatType.FILE}/>
    </div>
  </div>;
}

export type OpenChatInputProp = {
  channel: TalkOpenChannel
}

export const OpenChatInput: React.FC<OpenChatInputProp> = (prop) => {
  return <div>
    <TextChatInput channel={prop.channel} />
    <div>
      <p>사진 전송</p>
      <MediaChatInput channel={prop.channel} type={KnownChatType.PHOTO}/>
    </div>
    <div>
      <p>파일 전송</p>
      <MediaChatInput channel={prop.channel} type={KnownChatType.FILE}/>
    </div>
  </div>;
}

export type TextChatInputProp = {
  channel: TalkChannel
}

export const TextChatInput: React.FC<TextChatInputProp> = (prop) => {
  async function sendChat(chat: Chat) {
    const res = await prop.channel.sendChat(chat);
    if (!res.success) {
      alert(`채팅 전송이 실패 했습니다. status: ${res.status}`);
      return;
    }
  }

  return <ChatInputForm onChat={(chat) => sendChat(chat).then()} />;
}

export type MediaChatInputProp = {
  channel: TalkChannel,
  type: ChatType
}

export const MediaChatInput: React.FC<MediaChatInputProp> = (prop) => {
  const fileInputRef = createRef<HTMLInputElement>();

  async function clickHandler() {
    if (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length < 1) return;

    const file = fileInputRef.current.files[0];
    const res = await prop.channel.sendMedia(prop.type, {
      name: file.name,
      data: new Uint8Array(await file.arrayBuffer()),
      ext: ''
    });

    if (!res.success) {
      alert(`미디어 전송이 실패 했습니다. status: ${res.status}`);
      return;
    }
  }

  return <form>
    <input type='file' ref={fileInputRef}/>
    <button type='button' onClick={() => clickHandler().then()}>전송</button>
  </form>
}