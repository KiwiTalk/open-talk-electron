/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

/*
 * Created on Fri Feb 26 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

const { util } = require('node-kakao');
const os = require('os');
const { getAppDataPath, start } = require('./common');

/**
 * 현재 기기의 디바이스 id를 만들거나 가져옴
 */
function getCurrentDeviceUUID() {
  let id = window.localStorage.getItem('dev_id');
  if (!id) {
    id = util.randomWin32DeviceUUID();
    window.localStorage.setItem('dev_id', id);
  }

  return id;
}

/**
 * 현재 기기의 디바이스 name을 가져옴
 */
function getCurrentDeviceName () {
  if (os.platform() === 'win32') {
    return os.hostname();
  }

  return `${os.userInfo().username}@${os.hostname()}`;
}

start({
  uuid: getCurrentDeviceUUID(),
  name: getCurrentDeviceName(),
  appDataPath: getAppDataPath()
}).then();