/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React from 'react';
import { TalkOpenChannel, TalkNormalChannel } from 'node-kakao';

export type ChannelItemProp = {
  focused?: boolean,
  selected?: boolean,
  onClick?: () => void
};

export type OpenChannelItemProp = ChannelItemProp & { channel: TalkOpenChannel };
export type NormalChannelItemProp = ChannelItemProp & { channel: TalkNormalChannel };

export const NormalChannelItem: React.FC<NormalChannelItemProp> = (prop) => {
  return <li onClick={prop.onClick}><p>{prop.channel.getDisplayName()}</p></li>;
};

export const OpenChannelItem: React.FC<OpenChannelItemProp> = (prop) => {
  return <li onClick={prop.onClick}><p>(Open) {prop.channel.getDisplayName()}</p></li>;
};
