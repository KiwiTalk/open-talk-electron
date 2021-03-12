/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React from 'react';
import { ChatComponentProp } from ".";

export const TextChatComponent: React.FC<ChatComponentProp> = (prop) => {
  return <p>prop.chat.text</p>;
}