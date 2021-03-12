/*
 * Created on Sat Feb 27 2021
 *
 * Copyright (c) storycraft. Licensed under the GNU General Public License v3.
 */

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';

const plugins = [
  nodeResolve({
    preferBuiltins: true
  }),
  commonjs({
    ignoreGlobal: true
  }),
  url(),
  json(),
  typescript()
];

/** @type {import('rollup').InputOptions} */
const opts = {
  input: 'src/index.ts',
  preserveEntrySignatures: true,
  external: [
    
  ],
  shimMissingExports: false,
  output: [
    {
      dir: 'build',
      format: 'cjs',
      exports: 'named',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false
    },
  ],
  plugins,
};

export default () => {
  return opts;
};
