/*
 * Created on Fri Feb 26 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { ClientConfig, OAuthLoginConfig, TalkClient } from 'node-kakao';

export type OpenKakaoTalkOpts = {
  name: string;
  uuid: string;
  appDataPath: string;
}

export class OpenKakaoTalkApp {
  private _client: TalkClient;

  constructor (
    public options: OpenKakaoTalkOpts,
    public clientConfig?: Partial<OAuthLoginConfig & ClientConfig>
  ) {
    this._client = new TalkClient(clientConfig);
  }

  get client(): TalkClient {
    return this._client;
  }
}
