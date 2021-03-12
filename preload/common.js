/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */
const { app } = require('electron').remote;
const path = require('path');

module.exports.getAppDataPath = function() {
  return path.join(app.getPath('userData'), 'app');
}

module.exports.start = (
  /** @type {import('../src/app').OpenKakaoTalkOpts} */
  options
) => {
  return require('../build/index').start(options);
}