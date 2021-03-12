/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { Chat } from 'node-kakao';
import React, { createRef } from 'react';

export type ChatInputFormProp = {
  onChat?: (chat: Chat) => void;
}

export const ChatInputForm: React.FC<ChatInputFormProp> = (prop) => {
  const inputRef = createRef<HTMLInputElement>();

  async function sendChat() {
    if (!prop.onChat || !inputRef.current) return;

    prop.onChat({
      type: 1,
      text: inputRef.current.value
    });
  }

  return <form>
    <input
      type='text'
      placeholder='이곳에 텍스트를 입력'
    ></input>
    <button type='button' onClick={sendChat}>send</button>
  </form>;
}