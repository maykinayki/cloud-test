// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { baseConfig, DIST_DIR_DEV } from "./rollup.config.ts";
import path from "path";

export default {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    file: path.join(DIST_DIR_DEV, "assets", "bundle.js"),
  },
  plugins: [...baseConfig.plugins],
};
