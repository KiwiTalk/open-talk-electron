/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { TalkNormalChannel, TalkOpenChannel } from "node-kakao";

export enum OpenKakaoTalkChannelType {
  NORMAL = 0,
  OPENCHAT = 1
}

type Channel<T extends OpenKakaoTalkChannelType, I> = {
  type: T,
  instance: I
}

export type OpenKakaoTalkChannel =
  Channel<OpenKakaoTalkChannelType.NORMAL, TalkNormalChannel> |
  Channel<OpenKakaoTalkChannelType.OPENCHAT, TalkOpenChannel>;