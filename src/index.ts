/*
 * Created on Fri Feb 26 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import { OpenKakaoTalkApp, OpenKakaoTalkOpts } from './app';
import { SurfaceRenderer } from './visual';

export async function start(options: OpenKakaoTalkOpts): Promise<void> {
  const app = new OpenKakaoTalkApp(options);

  const renderer = new SurfaceRenderer(app);
  const wrapper = document.createElement('div');
  if (!wrapper) throw new Error('Invalid app wrapper!');
  renderer.render(wrapper);

  function hook(): void {
    document.body.appendChild(wrapper);
  }

  if (document.body) {
    hook();
  } else {
    window.addEventListener('DOMContentLoaded', hook, { once: true });
  }

  window.addEventListener('close', () => {
    app.client.close();
  });
}
