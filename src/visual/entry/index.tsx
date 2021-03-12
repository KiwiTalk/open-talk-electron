/*
 * Created on Fri Feb 26 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React, { useEffect, useState } from 'react';
import { OpenKakaoTalkAppProp } from '..';
import { OAuthCredential } from 'node-kakao';
import { Login } from './login';
import { Main } from './main';

export const Entry: React.FC<OpenKakaoTalkAppProp> = (prop) => {
  const [credential, setCredential] = useState<OAuthCredential>();

  const errorListener = (err: unknown) => {
    console.log(`Client error err: ${err}`);
  };

  const disconnectListener = (reason: number) => {
    alert(`연결이 끊어졌습니다. reason: ${reason}`);
    setCredential(undefined);
  };

  useEffect(() => {
    prop.app.client.on('disconnected', disconnectListener);

    return () => { prop.app.client.removeListener('disconnected', disconnectListener); };
  });

  useEffect(() => {
    prop.app.client.on('error', errorListener);

    return () => { prop.app.client.removeListener('error', errorListener); };
  });

  if (!credential) {
    return <Login app={prop.app} onLogin={(credential) => setCredential(credential)} />;
  }

  return <Main app={prop.app} credential={credential} />;
};
