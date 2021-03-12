/*
 * Created on Fri Feb 26 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React from 'react';
import { AuthApiClient, OAuthCredential } from 'node-kakao';
import { Async } from 'react-async';
import { OpenKakaoTalkAppProp } from '..';
import { LoginPage } from '../login';

export type LoginProp = OpenKakaoTalkAppProp & { onLogin: (credential: OAuthCredential) => void };

export const Login: React.FC<LoginProp> = (prop) => {
  return (
    <Async promiseFn={
    () => AuthApiClient.create(
      prop.app.options.name,
      prop.app.options.uuid,
      prop.app.clientConfig
    )}>
      <Async.Pending>
        <p>Loading...</p>
      </Async.Pending>
      <Async.Fulfilled>
        {(api: AuthApiClient) => {
          return (
            <LoginPage
              api={api} onLogin={async (credential) => {
                const loginRes = await prop.app.client.login(credential);
                if (!loginRes.success) {
                  alert(`접속 중 오류가 발생했습니다 status: ${loginRes.status}`);
                  return;
                }

                prop.onLogin(credential);
              }}
            />
          );
        }}
      </Async.Fulfilled>
    </Async>
  );
};
