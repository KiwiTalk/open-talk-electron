/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { AuthApiClient } from 'node-kakao';
import React, { createRef, useEffect } from 'react';
import { WebLoginInfo } from '.';

export type DeviceRegisterProp = {
  loginInfo: WebLoginInfo,
  api: AuthApiClient,
  onRegister(cancelled: boolean): void
};

export const DeviceRegister: React.FC<DeviceRegisterProp> = (prop) => {
  useEffect(() => {
    prop.api.requestPasscode(prop.loginInfo).then((res) => {
      if (!res.success) {
        alert(`패스코드 요청이 실패 했습니다. status: ${res.status}`);
      }
    });
  });

  return <DeviceRegisterForm
  registerFn={(passcode) => {
    prop.api.registerDevice({ ...prop.loginInfo, forced: true }, passcode).then((res) => {
      if (!res.success) {
        alert(`기기 등록이 실패 했습니다 status: ${res.status}`);
        return;
      }

      return prop.onRegister(false);
    }).then();
  }}
/>;
}

export type DeviceRegisterFormProp = {
  passcode?: string,
  registerFn(passcode: string): void
};

export const DeviceRegisterForm: React.FC<DeviceRegisterFormProp> = (prop) => {
  const passcodeRef = createRef<HTMLInputElement>();
  return <form>
    <input
      type='text'
      defaultValue={prop.passcode}
      ref={passcodeRef}
     placeholder='패스코드 입력'>
    </input>
    <button
      type='button'
      onClick={() => {
        if (!passcodeRef.current) return;
        prop.registerFn(passcodeRef.current.value);
      }}
    >등록</button>
  </form>;
}