/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React, { createRef } from 'react';
import { WebLoginInfo } from '.';

export type LoginFormProp = {
  onLogin: (result: WebLoginInfo) => void,
  loginInfo?: WebLoginInfo
};

export const LoginForm: React.FC<LoginFormProp> = (prop) => {
  const emailRef = createRef<HTMLInputElement>();
  const pwdRef = createRef<HTMLInputElement>();

  async function login() {
    const email = emailRef.current?.value || '';
    const password = pwdRef.current?.value || '';
    if (email.length < 1 || password.length < 1) {
      return;
    }

    prop.onLogin({ email, password });
  }

  return <form>
    <input
      placeholder='Email'
      ref={emailRef}
      defaultValue={prop.loginInfo?.email}
    />
    <input
      type='password'
      ref={pwdRef}
      placeholder='Password'
      defaultValue={prop.loginInfo?.password}
    />
    <button
      type='button' onClick={login}
    >Login
    </button>
  </form>;
};
