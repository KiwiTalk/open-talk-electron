/*
 * Created on Fri Feb 26 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { OpenKakaoTalkApp } from '../app';
import { Entry } from './entry';
import React from 'react';
import * as ReactDOM from 'react-dom';

export interface OpenKakaoTalkAppProp {
  app: OpenKakaoTalkApp;
}

export class SurfaceRenderer {
  private _surface: JSX.Element;

  constructor (
    private _app: OpenKakaoTalkApp
  ) {
    this._surface = <Entry app={this._app} />;
  }

  render(element: Element): void {
    ReactDOM.render(this._surface, element);
  }

  get app(): OpenKakaoTalkApp {
    return this._app;
  }
}
