import path from "path";

import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import externalGlobals from "rollup-plugin-external-globals";
import { babel } from "@rollup/plugin-babel";

export const ROOT_DIR = path.resolve(__dirname, "..");
export const extensions = [".ts", ".tsx"];
export const globalLibraries = {
  react: "React",
  "react-dom": "ReactDOM",
  lodash: "_",
};

export const output = {
  file: path.join(ROOT_DIR, "dist", "assets", "bundle.js"),
  format: "esm",
  exports: "default",
  name: "RenderFragment",
  compact: false,
  sourcemap: true,
  globals: globalLibraries,
};

export const plugins = [
  typescript(),
  babel({
    babelHelpers: "bundled",
    include: ["src/**/*"],
    extensions,
  }),
  nodeResolve(),
  externalGlobals({
    ...globalLibraries,
  }),
];
export const external = {
  ...Object.keys(globalLibraries),
};

export const baseConfig = {
  input: path.join(ROOT_DIR, "src", "client", "index.tsx"),
  output,
  external,
  plugins,
};
