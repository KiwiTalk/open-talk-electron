/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React from 'react';
import { TalkNormalChannel, TalkOpenChannel } from 'node-kakao';
import { OpenKakaoTalkChannel, OpenKakaoTalkChannelType } from '../../../channel';
import { NormalChatInput, OpenChatInput } from '../../chat/input';
import { ChatList } from '../../chat/list';

export type ChannelChatBoxProp = { channel?: OpenKakaoTalkChannel };

export type SubChatBoxProp<T> = { channel: T };

export const ChannelChatBox: React.FC<ChannelChatBoxProp> = (prop) => {
  if (!prop.channel) return <EmptyChannelChatBox />;

  if (prop.channel.type === OpenKakaoTalkChannelType.NORMAL) {
    return <NormalChannelChatBox channel={prop.channel.instance} />;
  } else if (prop.channel.type === OpenKakaoTalkChannelType.OPENCHAT) {
    return <OpenChannelChatBox channel={prop.channel.instance} />;
  }

  return <p>이 타입의 채팅방은 지원되지 않습니다</p>;
};

export const EmptyChannelChatBox: React.FC = () => {
  return <p>채팅방을 클릭해 채팅을 볼 수 있습니다</p>;
}

export const NormalChannelChatBox: React.FC<SubChatBoxProp<TalkNormalChannel>> = (prop) => {
  return <div>
    <p>ㅎㅇ TalkNormalChannel</p>
    <ChatList channel={prop.channel} />
    <NormalChatInput channel={prop.channel} />
  </div>;
}

export const OpenChannelChatBox: React.FC<SubChatBoxProp<TalkOpenChannel>> = (prop) => {
  return <div>
    <p>ㅎㅇ TalkOpenChannel</p>
    <ChatList channel={prop.channel}/>
    <OpenChatInput channel={prop.channel}/>
  </div>;
}
