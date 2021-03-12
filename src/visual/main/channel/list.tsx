/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React, { useState } from 'react';
import { OpenChannelItem, NormalChannelItem } from './item';
import { talk } from 'node-kakao';
import { OpenKakaoTalkChannel, OpenKakaoTalkChannelType } from '../../../channel';

export type ChannelListProp = {
  channelList: talk.TalkChannelList,
  onSelected(channel: OpenKakaoTalkChannel): void
};

export const ChannelList: React.FC<ChannelListProp> = (prop) => {
  const [selected, setSelected] = useState<number>();
  const openList = Array.from(prop.channelList.open.all()).sort();
  const normalList = Array.from(prop.channelList.normal.all()).sort();

  function createSelectListener(
    index: number,
    channel: OpenKakaoTalkChannel
  ): () => void {
    return () => {
      setSelected(index);
      prop.onSelected(channel);
    }
  }

  return (
    <ul>
      {
        (() => {
          let index = 0;
          const list = [];
          for (const channel of openList) {
            list.push(<OpenChannelItem
              channel={channel}
              key={channel.channelId.toString()}
              selected={selected === index}
              onClick={createSelectListener(index, { type: OpenKakaoTalkChannelType.OPENCHAT, instance: channel })}
            />);
            index++;
          }

          for (const channel of normalList) {
            list.push(<NormalChannelItem
              channel={channel}
              key={channel.channelId.toString()}
              selected={selected === index}
              onClick={createSelectListener(index, { type: OpenKakaoTalkChannelType.NORMAL, instance: channel })}
            />);
            index++;
          }

          return list;
        })()
      }
    </ul>
  );
};
