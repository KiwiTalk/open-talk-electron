/*
 * Created on Tue Mar 02 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

const { BrowserWindow } = require('electron');

module.exports.initWindow = async (
/** @type {import('electron').BrowserViewConstructorOptions} */
  opts
) => {
  const win = new BrowserWindow(opts);

  win.webContents.on('will-navigate', (event) => {
    event.preventDefault();
  });

  return win;
}

module.exports.loadWindow = (win) => {
  return win.loadURL(`file://${__dirname}/../index.html`);
}
