/*
 * Created on Fri Feb 26 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React from 'react';
import { OpenKakaoTalkAppProp } from '..';
import { OAuthCredential } from 'node-kakao';
import { AppChannelView, AppFooter } from '../main';

export type MainProp = OpenKakaoTalkAppProp & {
  credential: OAuthCredential
}

export const Main: React.FC<MainProp> = (prop) => {
  return (
    <div>
      <AppChannelView {...prop} />
      <AppFooter {...prop} />
    </div>
  );
};
