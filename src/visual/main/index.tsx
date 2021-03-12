/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { OpenKakaoTalkAppProp } from '..';
import { Async } from 'react-async';
import { CommandResult, OAuthCredential, ServiceApiClient, api } from 'node-kakao';
import React from 'react';
import { Footer } from './footer';
import { ChannelView } from './channel';

export type MainAppProp = OpenKakaoTalkAppProp & {
  credential: OAuthCredential
};

export const AppChannelView: React.FC<MainAppProp> = (prop) => {
  return <ChannelView channelList={prop.app.client.channelList} />;
};

export const AppFooter: React.FC<MainAppProp> = (prop) => {
  return (
    <Async promiseFn={async () => {
      const serviceClient = await ServiceApiClient.create(prop.credential, prop.app.clientConfig);
      return serviceClient.requestMoreSettings();
    }}
    >
      <Async.Pending>
        <p>Loading...</p>
      </Async.Pending>
      <Async.Fulfilled>
        {(infoRes: CommandResult<api.struct.MoreSettingsStruct>) => {
          if (!infoRes.success) {
            return <p>정보를 받아오는 중 오류가 발생했습니다. status: {infoRes.status}</p>;
          }

          return <Footer info={infoRes.result} />;
        }}
      </Async.Fulfilled>
    </Async>
  );
};
