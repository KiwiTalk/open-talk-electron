/*
 * Created on Mon Mar 01 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

const { getAppDataPath, start } = require('./common');

start({
  uuid: 'Y7DkNkMrpxZ5FhenqnvZ+l1k4l6DyPd2ZHSd6Rus0+HyO6Kxh4n+3IlbDMr9SfnMHvNDtDUrwHfWPadHOs2d2P==',
  name: 'A',
  appDataPath: getAppDataPath()
}).then();