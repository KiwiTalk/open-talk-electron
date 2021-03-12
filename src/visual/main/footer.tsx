/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import React from 'react';
import { api } from 'node-kakao';

type FooterProp = { info: api.struct.MoreSettingsStruct };

export const Footer: React.FC<FooterProp> = (prop) => {
  return <p>ㅎㅇ {prop.info.emailAddress}</p>;
};
