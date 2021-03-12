/*
 * Created on Sun Feb 28 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

const { app, BrowserWindow, session } = require('electron');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

async function main() {
  await app.whenReady();
  
  await installExtension(REACT_DEVELOPER_TOOLS);
  await installExtension(REACT_DEVELOPER_TOOLS);
  session.defaultSession.getAllExtensions().forEach((ext) => {
    session.defaultSession.removeExtension(ext.id);
    session.defaultSession.loadExtension(ext.path, { allowFileAccess: true }).then();
  });
  console.log('React devtools installed');

  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      sandbox: false,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  win.webContents.on('will-navigate', (event) => {
    event.preventDefault();
  });

  await win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools({ mode: 'detach' });
}

main().then();
