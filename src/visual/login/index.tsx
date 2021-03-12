/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { AuthApiClient, KnownAuthStatusCode, KnownDataStatusCode, OAuthCredential } from "node-kakao";
import React from "react";
import { useState } from "react";
import { LoginForm } from './login';
import { DeviceRegister } from './device-register';

export type LoginPageProp = {
  api: AuthApiClient,
  lastLoginStatus?: LastLoginStatus,
  onLogin: (result: OAuthCredential) => void
};

export type WebLoginInfo = {
  email: string;
  password: string;
}

export type LastLoginStatus = {
  status: number,
  loginInfo: WebLoginInfo
}

const DEFAULT_STATUS: LastLoginStatus = {
  status: KnownDataStatusCode.SUCCESS,
  loginInfo: {
    email: '',
    password: ''
  }
};

export const LoginPage: React.FC<LoginPageProp> = (prop) => {
  const [lastStatus, setStatus] = useState<LastLoginStatus>(prop.lastLoginStatus || DEFAULT_STATUS);

  async function login(loginInfo: WebLoginInfo, forced = false) {
    const loginRes = await prop.api.login({
      ...loginInfo, forced
    });

    if (!loginRes.success) {
      setStatus({
        status: loginRes.status,
        loginInfo
      });
      return;
    }
    
    prop.onLogin(loginRes.result);
  }

  if (lastStatus.status === KnownAuthStatusCode.LOGIN_FAILED ||
    lastStatus.status === KnownAuthStatusCode.LOGIN_FAILED_REASON) {
    alert(`카카오계정 또는 비밀번호를 다시 확인해 주세요 status: ${lastStatus.status}`);
  } else if (lastStatus.status === KnownAuthStatusCode.DEVICE_NOT_REGISTERED) {
    return <DeviceRegister
      api={prop.api}
      loginInfo={lastStatus.loginInfo}
      onRegister={(cancelled) => {
        if (cancelled) {
          setStatus(DEFAULT_STATUS);
          return;
        }
  
        login(lastStatus.loginInfo).then();
        }
      }
    />;
  } else if (lastStatus.status === KnownAuthStatusCode.ANOTHER_LOGON) {
    if (confirm('다른 기기에서 로그인중 입니다. 로그아웃 시키겠습니까?')) {
      login(lastStatus.loginInfo, true).then();
    }
  }
  
  return <LoginForm loginInfo={lastStatus.loginInfo} onLogin={(info) => {
    login(info).then();
  }}/>;
}