/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

const { app } = require('electron');
const { initWindow, loadWindow } = require('./common');

async function main() {
  await app.whenReady();

  const win = await initWindow({
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false,
      preload: `${__dirname}/../preload/index.js`
    },
  });

  win.setMenu(null);
  await loadWindow(win);
}

main().then();
