/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React, { useState } from 'react';
import { talk } from 'node-kakao';
import { ChannelList } from './list';
import { ChannelChatBox } from './chat-box';
import { OpenKakaoTalkChannel } from '../../../channel';

export type ChannelViewProp = {
  channelList: talk.TalkChannelList
};

export const ChannelView: React.FC<ChannelViewProp> = (prop) => {
  const [currentChannel, setCurrentChannel] = useState<OpenKakaoTalkChannel>();

  return (
    <div>
      <ChannelList channelList={prop.channelList} onSelected={setCurrentChannel} />
      <ChannelChatBox channel={currentChannel} />
    </div>
  );
};
