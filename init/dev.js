/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

const { app, session } = require('electron');
const { initWindow, loadWindow } = require('./common');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

async function main() {
  await app.whenReady();

  await installExtension(REACT_DEVELOPER_TOOLS);
  session.defaultSession.getAllExtensions().forEach((ext) => {
    session.defaultSession.removeExtension(ext.id);
    session.defaultSession.loadExtension(ext.path, { allowFileAccess: true }).then();
  });

  let win = await initWindow({
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  await loadWindow(win);

  win.webContents.executeJavaScript(`require(\'./preload/dev.js\');`);

  win.webContents.openDevTools({ mode: 'detach' });
}

main().then();
